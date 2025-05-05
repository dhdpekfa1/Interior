'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { InView } from 'react-intersection-observer';
import { MoveRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { ProductHome } from '@/types/sample';

const SecondSectionClient = ({
  productHomeData,
}: {
  productHomeData: ProductHome[];
}) => {
  return (
    <>
      {productHomeData.map((item, index) => (
        <InView key={item.label} threshold={0.2}>
          {({ ref, inView }) => {
            return (
              <Link
                href={item.url}
                ref={ref}
                className={cn(
                  'flex flex-col items-center gap-2 group transition-all duration-700 ease-out',
                  index < 3 ? 'w-[90%] md:w-[30%]' : 'w-[90%] md:w-[30%]',
                  inView
                    ? 'opacity-100 translate-y-0 md:translate-y-0 md:translate-x-0'
                    : 'opacity-0 translate-y-10 md:translate-y-0 md:translate-x-10'
                )}
              >
                {/* 이미지 */}
                <div className='flex items-center justify-center w-full h-[20rem] md:h-[380px] lg:h-[480px] overflow-hidden'>
                  <Image
                    src={item.home_image}
                    alt={item.label}
                    width={300}
                    height={200}
                    className='w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110'
                  />
                </div>

                {/* 텍스트 + 버튼 */}
                <div className='flex flex-col items-center gap-2'>
                  <h2 className='text-lg md:text-xl font-bold text-two'>
                    {item.label}
                  </h2>
                  {item.home_description && (
                    <span className='text-sm md:text-base w-[65%] break-keep text-center text-three'>
                      {item.home_description}
                    </span>
                  )}

                  <Button
                    variant='outline'
                    className={cn(
                      'group flex items-center justify-center',
                      'px-3 py-1 border bg-white/80 border-two/50 text-two/50 text-xs md:text-sm transition-all duration-300 mb-6',
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
    </>
  );
};

export { SecondSectionClient };
