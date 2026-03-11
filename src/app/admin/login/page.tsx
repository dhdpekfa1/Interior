import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server';
import AdminLoginForm from './AdminLoginForm';
import { cn } from '@/lib/utils';

export default async function AdminLoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/admin');
  }

  return (
    <main
      className={cn(
        'min-h-screen h-[16rem] md:h-[24rem] lg:h-[32rem] w-full relative md:pt-20',
        'flex flex-col items-center justify-center',
      )}
    >
      <div className='p-10 border border-point w-5/6 md:w-1/2 lg:w-1/3'>
        <h1 className='text-2xl font-bold'>관리자 로그인</h1>
        <p className='mb-8 mt-2 text-sm text-gray-600'>
          로그인 후 관리자 페이지로 이동합니다.
        </p>
        <AdminLoginForm />
      </div>
    </main>
  );
}
