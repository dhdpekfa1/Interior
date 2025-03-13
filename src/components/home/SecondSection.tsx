'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { InView } from 'react-intersection-observer';
import { MoveRight } from 'lucide-react';
import { menuData } from '@/assets/navMenuData';
import { Button } from '@/components/ui';
import { SectionHeader } from '@/components/home';

export const SecondSection = () => {
  const data = menuData.find((data) => data.title === '제품소개');

  if (!data || !data.subMenu) {
    return (
      <div className='w-full flex flex-wrap justify-center gap-8 px-4 py-10'>
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className='w-[90%] md:w-[30%] flex flex-col items-center gap-4 animate-pulse'
          >
            <div className='w-full h-[30rem] md:h-[380px] bg-gray-200 rounded-md' />
            <div className='w-1/2 h-5 bg-gray-200 rounded-md mt-4' />
            <div className='w-24 h-8 bg-gray-200 rounded-md mt-2' />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <SectionHeader
        title='우리의 제품'
        description='최고의 품질과 기술력으로 완성된 제품을 소개합니다.'
      />
      <div className='w-full flex flex-wrap justify-center gap-4 md:gap-8 px-4'>
        {data.subMenu.map((item, index) => (
          <InView key={item.label} threshold={0.2}>
            {({ ref, inView }) => {
              return (
                <Link
                  href={item.url}
                  ref={ref}
                  className={cn(
                    'flex flex-col items-center gap-4 group transition-all duration-700 ease-out',
                    index < 3 ? 'w-[90%] md:w-[30%]' : 'w-[90%] md:w-[30%]',
                    inView
                      ? 'opacity-100 translate-y-0 md:translate-y-0 md:translate-x-0'
                      : 'opacity-0 translate-y-10 md:translate-y-0 md:translate-x-10'
                  )}
                >
                  {/* 이미지 */}
                  <div className='flex items-center justify-center w-full h-[20rem] md:h-[380px] lg:h-[480px] overflow-hidden'>
                    <Image
                      src={item.img!}
                      alt={item.label}
                      width={300}
                      height={200}
                      priority
                      className='w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110'
                    />
                  </div>

                  {/* 텍스트 + 버튼 */}
                  <div className='flex flex-col items-center gap-2'>
                    <h2 className='text-lg md:text-xl font-bold text-two'>
                      {item.label}
                    </h2>
                    <span className='text-sm md:text-base w-[65%] break-keep text-center text-three'>
                      {item.description}
                    </span>
                    <Button
                      variant='outline'
                      className={cn(
                        'group flex items-center justify-center',
                        'mt-2 px-3 py-1 border bg-white/80 border-two/50 text-two/50 text-xs md:text-sm transition-all duration-300 mb-6',
                        'group-hover:border-point group-hover:text-point hover:bg-white/80'
                      )}
                    >
                      제품 보기
                      <MoveRight className='ml-1 text-base text-two/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-point' />
                    </Button>
                  </div>
                </Link>
              );
            }}
          </InView>
        ))}
      </div>
    </>
  );
};
