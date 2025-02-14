import React from 'react';
import { SubTitle } from '@/components/common';

export const AboutUsTab = () => {
  return (
    <div className='wrapper'>
      <SubTitle title='회사 소개' />
      <div className='grid gap-4 w-full grid-cols-1 md:grid-cols-2'>
        <div className='bg-cream h-[320px] md:h-[400px]'>사진</div>
        <div className='bg-cream h-[320px] md:h-[400px]'>소개</div>
      </div>
    </div>
  );
};
