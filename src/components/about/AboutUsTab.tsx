import React from 'react';
import Image from 'next/image';
import { SubTitle } from '@/components/common';

export const AboutUsTab = () => {
  return (
    <div className='wrapper'>
      <SubTitle title='회사 소개' />
      <div className='grid gap-4 md:gap-6 lg:gap-8 w-full grid-cols-1 md:grid-cols-2 items-center justify-center'>
        <div className='relative h-[400px] md:h-[400px] w-full'>
          <Image
            src='https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='회사'
            fill
            className='w-full h-full object-cover'
          />
        </div>
        <div className='h-[320px] md:h-[400px] flex flex-col gap-2 md:gap-4 lg:gap-6 leading-relaxed text-sm md:text-base'>
          <p className='break-keep'>
            YD인더스트리에 변함없는 관심과 성원을 주시는 여러분께 깊은 감사를
            드립니다. ㈜YD인더스트리는 대한민국을 대표하는 친환경 목재 가공 전문
            기업 입니다.
          </p>
          <p className='break-keep'>
            친환경 가공보드인 MDF(Melamine Faced Board) / PB(Particle Board)에
            L.P.M / H.P.M / P.E.T / A.S.A / P.P / P.V.C 등 다양한 표면재를
            가공하여 APT가구, 부엌가구, 인테리어 가구 등에 공급, 납품하고
            있습니다.
          </p>
          <p className='break-keep'>
            2018년 건립 이후 끊임없는 연구, 개발과 설비투자를 통하여 고객의
            니즈와 다양한 디자인을 창조, 개발에 힘쓰고 있습니다. 앞으로도 다양한
            칼라구현이 가능한 포면재를 개발 하여 건설사, 인테리어 업체 및
            가구업체 공급에 앞장설 것을 약속 드립니다.
          </p>

          <div className='mt-4 text-lg md:text-xl flex justify-end gap-2 sm:gap-3 text-[#555]'>
            <p>㈜YD인더스트리 대표이사</p>
            <p className='font-semibold'>최영대</p>
          </div>
        </div>
      </div>
    </div>
  );
};
