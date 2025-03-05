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
        'h-[12rem] md:h-[20rem] lg:h-[32rem] w-full relative text-white flex items-center justify-center overflow-hidden'
      )}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='absolute inset-0 bg-black/30' />

      <div className='relative z-10 text-center space-y-2 p-4 rounded-md'>
        <h2
          className='font-bold text-xl md:text-3xl lg:text-5xl drop-shadow-lg'
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
