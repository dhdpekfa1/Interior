'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();

  useEffect(() => {
    console.error('오류 ==> ', error);
  }, [error]);

  return (
    <div className='container flex flex-col items-center justify-center h-screen text-center'>
      {/* ERROR 텍스트 */}
      <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest flex items-center gap-2'>
        <span className='flex items-center text-second'>
          ERR
          <AlertTriangle />R
        </span>
        <span className='text-ef flex items-center'>PAGE</span>
      </h1>

      {/* 안내 문구 */}
      <p className='mt-4 text-ef/60 text-base md:text-lg lg:text-xl'>
        죄송합니다. 페이지를 불러오는 중 오류가 발생했습니다.
      </p>
      <p className='text-ef/40 mt-2 text-xs md:text-base lg:text-lg break-keep'>
        <span className='hidden sm:inline'>일시적인 문제가 발생했거나,</span>{' '}
        네트워크 연결이 원활하지 않을 수 있습니다.
      </p>

      {/* 버튼 그룹 */}
      <div className='mt-6 flex gap-4'>
        <Button
          onClick={() => reset()}
          className='border border-ef text-ef h-fit px-3 y-1 md:px-5 md:py-2 rounded-md hover:bg-ef/20 hover:text-white transition bg-point text-xs md:text-base'
        >
          다시 시도
        </Button>
        <Button
          onClick={() => router.replace('/')}
          className='border bg-ef/90 border-point text-point h-fit px-4 y-1 md:px-6 md:py-2 rounded-md hover:bg-ef hover:text-point transition text-xs md:text-base lg:text-lg'
        >
          홈
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
