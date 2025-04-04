import React from 'react';
import { KakaoMap } from '@/components/common';
import { SectionHeader } from '@/components/home';

export const FourthSection = () => {
  return (
    <div className='m-8'>
      <SectionHeader
        title='새로운 길, 변함없는 약속'
        description='고객과 함께 성장하는 우리의 이야기를 만나보세요.'
      />
      <div className='flex flex-col sm:flex-row gap-6 sm:gap-2'>
        <KakaoMap />
        <div className='flex items-center justify-center w-full'>
          <p className='text-two text-base md:text-lg font-semibold text-center leading-relaxed'>
            <span className='text-point font-bold'>신뢰</span>와{' '}
            <span className='text-point font-bold'>진심</span>을 바탕으로 언제나
            최선을 다하는
            <br />
            <span className='text-point font-bold'>YD-Industry</span>입니다.
            <br />
            <br className='hidden sm:block' />
            함께 성장하며,{' '}
            <span className='text-point font-bold'>
              믿고 맡길 수 있는 파트너
            </span>
            로
            <br />
            고객 곁에 늘 가까이 있겠습니다.
          </p>
        </div>
      </div>
    </div>
  );
};
