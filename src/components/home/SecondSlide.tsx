import Image from 'next/image';
import Link from 'next/link';
import { menuData } from '@/assets/navMenuData';
import { Button } from '@/components/ui';
import { MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SecondSlide = () => {
  const data = menuData.find((data) => data.title === '제품소개');

  if (!data || !data.subMenu) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div className='w-full flex flex-wrap justify-center gap-8 px-4 py-10'>
      {data.subMenu.map((item, index) => (
        <Link
          href={item.url}
          key={item.label}
          className={cn(
            'flex flex-col items-center gap-4 group',
            index < 3 ? 'w-full md:w-[30%]' : 'w-[85%] md:w-[30%]'
          )}
        >
          {/* 이미지 */}
          <div className='flex items-center justify-center w-full h-[180px] md:h-[380px] overflow-hidden'>
            <Image
              src={item.img!}
              alt={item.label}
              width={300}
              height={200}
              className='w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110'
            />
          </div>

          {/* 텍스트 + 버튼 */}
          <div className='text-center'>
            <h2 className='text-lg md:text-xl font-bold text-two'>
              {item.label}
            </h2>
            <Button
              variant='outline'
              className={cn(
                'mt-2 px-3 py-1 border bg-white/80 border-two/80 text-two text-xs md:text-sm transition-all duration-300 mb-6',
                'group-hover:border-second/70 group-hover:text-second'
              )}
            >
              제품 보기
              <MoveRight
                className='ml-1 transition-[padding] duration-300 text-two group-hover:text-second group-hover:pl-1
  '
              />
            </Button>
          </div>
        </Link>
      ))}
    </div>
  );
};
