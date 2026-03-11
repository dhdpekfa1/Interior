import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const DB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const DB_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  if (!DB_URL || !DB_ANON_KEY) {
    return new Response('데이터베이스 연결 오류', { status: 500 });
  }

  const supabase = createServerClient(DB_URL, DB_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // 세션 갱신
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
