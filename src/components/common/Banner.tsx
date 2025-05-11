import { cn } from '@/lib/utils';
import React from 'react';

interface BannerProps {
  title: string;
  description: string;
  imgUrl: string;
}

export const Banner = ({ title, description, imgUrl }: BannerProps) => {
  return (
    <div
      className={cn(
        'h-[16rem] md:h-[24rem] lg:h-[32rem] w-full relative pt-14 md:pt-20  text-white flex items-center justify-center overflow-hidden'
      )}
    >
      {/* 이미지: 확대 후 축소 애니메이션 */}
      <div
        className='absolute inset-0 bg-black/30'
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'zoomIn 3s ease-out forwards',
        }}
      />

      {/* 텍스트 애니메이션 */}
      <div className='relative z-10 text-center space-y-2 p-4 rounded-md animate-fadeUp'>
        <h2
          className='font-medium text-xl md:text-3xl lg:text-5xl drop-shadow-lg'
          style={{
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
          }}
        >
          {title}
        </h2>
        <h4
          className='text-sm md:text-xl lg:text-xl'
          style={{
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4)',
          }}
        >
          {description}
        </h4>
      </div>
    </div>
  );
};
