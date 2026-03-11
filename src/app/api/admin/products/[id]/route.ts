import { NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';
import { createAdminClient } from '@/app/lib/supabase/admin';
import { getAdminUser } from '@/lib/admin-auth';
import { getProductTableByCategory } from '@/lib/admin-product';
import {
  ADMIN_PRODUCT_LIVE_PREFIX,
  ADMIN_PRODUCT_TMP_PREFIX,
  PRODUCT_IMAGE_BUCKET,
  SUPABASE_URL,
} from '@/constants';

type UpdateBody = {
  category: string;
  name?: string;
  image?: string;
  description?: string;
};

const unauthorized = () =>
  NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 401 });

const getStoragePathFromPublicUrl = (
  imageUrl: string | null | undefined,
  bucket: string,
) => {
  if (!imageUrl) return null;

  const marker = `/storage/v1/object/public/${bucket}/`;
  const markerIndex = imageUrl.indexOf(marker);
  if (markerIndex === -1) return null;

  const rawPath = imageUrl.slice(markerIndex + marker.length).split('?')[0];
  if (!rawPath) return null;
  return decodeURIComponent(rawPath);
};

const getPublicUrlFromPath = (path: string) => {
  if (!SUPABASE_URL) return '';
  return `${SUPABASE_URL}/storage/v1/object/public/${PRODUCT_IMAGE_BUCKET}/${path}`;
};

const finalizeTmpImageIfNeeded = async (imageUrl: string) => {
  const imagePath = getStoragePathFromPublicUrl(imageUrl, PRODUCT_IMAGE_BUCKET);
  if (!imagePath || !imagePath.startsWith(ADMIN_PRODUCT_TMP_PREFIX)) {
    return imageUrl;
  }

  const extension = imagePath.split('.').pop() || 'png';
  const finalPath = `${ADMIN_PRODUCT_LIVE_PREFIX}${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}.${extension}`;

  const adminClient = createAdminClient();
  const { error } = await adminClient.storage
    .from(PRODUCT_IMAGE_BUCKET)
    .move(imagePath, finalPath);

  if (error) {
    throw new Error(`임시 이미지 확정 실패: ${error.message}`);
  }

  return getPublicUrlFromPath(finalPath);
};

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const adminUser = await getAdminUser();
  if (!adminUser) return unauthorized();

  const { id } = await context.params;
  const body = (await req.json()) as Partial<UpdateBody>;

  if (!body.category) {
    return NextResponse.json(
      { error: 'category가 필요합니다.' },
      { status: 400 },
    );
  }

  const table = getProductTableByCategory(body.category);
  if (!table) {
    return NextResponse.json(
      { error: '지원하지 않는 category입니다.' },
      { status: 400 },
    );
  }

  const updatePayload = {
    ...(body.name !== undefined ? { name: body.name } : {}),
    ...(body.image !== undefined ? { image: body.image } : {}),
    ...(body.description !== undefined
      ? { description: body.description }
      : {}),
  };

  if (Object.keys(updatePayload).length === 0) {
    return NextResponse.json(
      { error: '수정할 값이 없습니다.' },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { data: currentProduct } = await supabase
    .from(table)
    .select('image')
    .eq('id', id)
    .single();

  if (body.image) {
    try {
      updatePayload.image = await finalizeTmpImageIfNeeded(body.image);
    } catch (error) {
      return NextResponse.json(
        {
          error: '이미지 확정 처리 실패',
          details: error instanceof Error ? error.message : String(error),
        },
        { status: 500 },
      );
    }
  }

  const { data, error } = await supabase
    .from(table)
    .update(updatePayload)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    return NextResponse.json(
      { error: '상품 수정 실패', details: error.message },
      { status: 500 },
    );
  }

  const beforeImagePath = getStoragePathFromPublicUrl(
    currentProduct?.image,
    PRODUCT_IMAGE_BUCKET,
  );
  const afterImagePath = getStoragePathFromPublicUrl(
    data?.image,
    PRODUCT_IMAGE_BUCKET,
  );

  if (beforeImagePath && beforeImagePath !== afterImagePath) {
    const adminClient = createAdminClient();
    await adminClient.storage
      .from(PRODUCT_IMAGE_BUCKET)
      .remove([beforeImagePath]);
  }

  return NextResponse.json({ item: data });
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const adminUser = await getAdminUser();
  if (!adminUser) return unauthorized();

  const { id } = await context.params;
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  if (!category) {
    return NextResponse.json(
      { error: 'category 쿼리가 필요합니다.' },
      { status: 400 },
    );
  }

  const table = getProductTableByCategory(category);
  if (!table) {
    return NextResponse.json(
      { error: '지원하지 않는 category입니다.' },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { data: target, error: targetError } = await supabase
    .from(table)
    .select('image')
    .eq('id', id)
    .single();
  if (targetError) {
    return NextResponse.json(
      { error: '삭제 대상 조회 실패', details: targetError.message },
      { status: 500 },
    );
  }

  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) {
    return NextResponse.json(
      { error: '상품 삭제 실패', details: error.message },
      { status: 500 },
    );
  }

  const imagePath = getStoragePathFromPublicUrl(
    target?.image,
    PRODUCT_IMAGE_BUCKET,
  );
  if (imagePath) {
    const adminClient = createAdminClient();
    const { error: storageError } = await adminClient.storage
      .from(PRODUCT_IMAGE_BUCKET)
      .remove([imagePath]);

    if (storageError) {
      return NextResponse.json(
        { error: '이미지 삭제 실패', details: storageError.message },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ success: true });
}
