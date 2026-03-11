import { NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';
import { getAdminUser } from '@/lib/admin-auth';
import { getProductTableByCategory } from '@/lib/admin-product';

type UpdateBody = {
  category: string;
  name?: string;
  image?: string;
  description?: string;
};

const PRODUCT_IMAGE_BUCKET = 'product-images';

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
    const { error: storageError } = await supabase.storage
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
