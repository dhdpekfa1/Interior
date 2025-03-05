'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { Ban } from 'lucide-react';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className='container flex flex-col items-center justify-center h-screen text-center'>
      {/* 404 ERROR 텍스트 */}
      <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest flex items-center gap-2'>
        <span className='flex items-center text-point'>
          4<Ban />4
        </span>
        <span className='text-point/90 flex items-center'>
          ERR
          <Ban />R
        </span>
      </h1>

      {/* 안내 문구 */}
      <p className='mt-4 text-two/70 text-base md:text-lg lg:text-xl'>
        죄송합니다. 현재 요청하신 페이지를 찾을 수 없습니다.
      </p>
      <p className='text-two/70 mt-2 text-xs md:text-base lg:text-lg break-keep'>
        <span className='hidden sm:inline'>
          존재하지 않는 주소를 입력했거나,
        </span>
        요청하신 페이지의 주소가 변경, 삭제되었을 수 있습니다.
      </p>

      {/* 버튼 그룹 */}
      <div className='mt-6 flex gap-4'>
        <Button
          onClick={() => router.back()}
          className='border border-ef text-ef h-fit px-3 y-1 md:px-5 md:py-2 rounded-md hover:bg-point hover:text-white transition bg-point/90 text-xs md:text-base'
        >
          이전
        </Button>
        <Button
          onClick={() => router.replace('/')}
          className='border bg-white border-point text-point h-fit  px-4 y-1 md:px-6 md:py-2 rounded-md hover:bg-ef hover:text-point transition text-xs md:text-base lg:text-lg'
        >
          홈
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
