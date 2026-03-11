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

type CreateProductBody = {
  category: string;
  name: string;
  image: string;
  description: string;
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
  const baseUrl = SUPABASE_URL;
  if (!baseUrl) return '';
  return `${baseUrl}/storage/v1/object/public/${PRODUCT_IMAGE_BUCKET}/${path}`;
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

export async function GET(req: Request) {
  const adminUser = await getAdminUser();
  if (!adminUser) return unauthorized();

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
  const { data, error } = await supabase.from(table).select('*').order('name');

  if (error) {
    return NextResponse.json(
      { error: '상품 목록 조회 실패', details: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ items: data ?? [] });
}

export async function POST(req: Request) {
  const adminUser = await getAdminUser();
  if (!adminUser) return unauthorized();

  const body = (await req.json()) as Partial<CreateProductBody>;
  if (!body.category || !body.name || !body.image) {
    return NextResponse.json(
      { error: 'category, name, image는 필수값입니다.' },
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

  let finalImageUrl = body.image;
  try {
    finalImageUrl = await finalizeTmpImageIfNeeded(body.image);
  } catch (error) {
    return NextResponse.json(
      {
        error: '이미지 확정 처리 실패',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from(table)
    .insert({
      name: body.name,
      image: finalImageUrl,
      description: body.description ?? '',
    })
    .select('*')
    .single();

  if (error) {
    return NextResponse.json(
      { error: '상품 등록 실패', details: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ item: data }, { status: 201 });
}
