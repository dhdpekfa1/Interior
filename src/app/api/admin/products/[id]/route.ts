import { NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';
import { createAdminClient } from '@/app/lib/supabase/admin';
import { getAdminUser } from '@/lib/admin-auth';
import { unauthorized } from '@/lib/admin-response';
import { getProductTableByCategory } from '@/lib/admin-product';
import { finalizeTmpImageIfNeeded, getSafeStoragePathFromPublicUrl } from '@/lib/admin-product-image';
import {
  PRODUCT_IMAGE_BUCKET,
} from '@/constants';

type UpdateBody = {
  category: string;
  name?: string;
  image?: string;
  description?: string;
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

  const beforeImagePath = getSafeStoragePathFromPublicUrl(
    currentProduct?.image,
    PRODUCT_IMAGE_BUCKET,
  );
  const afterImagePath = getSafeStoragePathFromPublicUrl(
    data?.image,
    PRODUCT_IMAGE_BUCKET,
  );

  if (beforeImagePath && beforeImagePath !== afterImagePath) {
    const adminClient = createAdminClient();
    const { error: removeError } = await adminClient.storage
      .from(PRODUCT_IMAGE_BUCKET)
      .remove([beforeImagePath]);

    if (removeError) {
      console.error('이전 이미지 삭제 실패 (PATCH 후처리)', {
        productId: id,
        table,
        beforeImagePath,
        afterImagePath,
        message: removeError.message,
      });
    }
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

  const imagePath = getSafeStoragePathFromPublicUrl(
    target?.image,
    PRODUCT_IMAGE_BUCKET,
  );
  if (imagePath) {
    const adminClient = createAdminClient();
    const { error: storageError } = await adminClient.storage
      .from(PRODUCT_IMAGE_BUCKET)
      .remove([imagePath]);

    if (storageError) {
      console.error('상품 삭제 후 이미지 삭제 실패', {
        productId: id,
        table,
        imagePath,
        message: storageError.message,
      });
      return NextResponse.json(
        { error: '이미지 삭제 실패', details: storageError.message },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ success: true });
}
