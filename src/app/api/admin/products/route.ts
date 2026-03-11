import { NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';
import { getAdminUser } from '@/lib/admin-auth';
import { getProductTableByCategory } from '@/lib/admin-product';

type CreateProductBody = {
  category: string;
  name: string;
  image: string;
  description: string;
};

const unauthorized = () =>
  NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 401 });

export async function GET(req: Request) {
  const adminUser = await getAdminUser();
  if (!adminUser) return unauthorized();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  if (!category) {
    return NextResponse.json(
      { error: 'category 쿼리가 필요합니다.' },
      { status: 400 }
    );
  }

  const table = getProductTableByCategory(category);
  if (!table) {
    return NextResponse.json(
      { error: '지원하지 않는 category입니다.' },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from(table).select('*').order('name');

  if (error) {
    return NextResponse.json(
      { error: '상품 목록 조회 실패', details: error.message },
      { status: 500 }
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
      { status: 400 }
    );
  }

  const table = getProductTableByCategory(body.category);
  if (!table) {
    return NextResponse.json(
      { error: '지원하지 않는 category입니다.' },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from(table)
    .insert({
      name: body.name,
      image: body.image,
      description: body.description ?? '',
    })
    .select('*')
    .single();

  if (error) {
    return NextResponse.json(
      { error: '상품 등록 실패', details: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ item: data }, { status: 201 });
}
