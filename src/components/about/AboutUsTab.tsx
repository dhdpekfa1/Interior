import React from 'react';
import { SubTitle } from '@/components/common';

export const AboutUsTab = () => {
  return (
    <div className='wrapper'>
      <SubTitle title='회사 소개' />
      <div className='grid gap-4 md:gap-6 lg:gap-8 w-full grid-cols-1 md:grid-cols-2'>
        <div className='bg-cream h-[320px] md:h-[400px]'>사진</div>
        <div className='h-[320px] md:h-[400px] text-sm md:text-base flex flex-col md:gap-2 leading-relaxed'>
          <p>안녕하세요.</p>
          <p>저희 YD-Industry는</p>
          <p>수많은 현장에서 쌓아온 경험과 노하우를 바탕으로,</p>
          <p>신뢰할 수 있는 전문 타일 시공 서비스를 제공합니다.</p>

          <p className='mt-4'>정직한 시공, 최상의 품질, 합리적인 비용으로</p>
          <p>고객님의 공간에 가치를 더하며,</p>
          <p>마지막까지 책임지는 시공으로 믿음을 드리겠습니다.</p>

          <p className='mt-4'>언제나 신뢰를 최우선으로 생각하는 YD-Industry,</p>
          <p>변함없는 마음으로 최선을 다하겠습니다.</p>
          <p>감사합니다.</p>
        </div>
      </div>
    </div>
  );
};
