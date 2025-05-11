'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { KakaoMap } from '@/components/common';
import { SectionHeader } from '@/components/home';

export const FourthSection = () => {
  return (
    <section className='w-full bg-white py-20 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* 제목 */}
        <SectionHeader
          title='새로운 길, 변함없는 약속'
          description='고객과 함께 성장하는 우리의 이야기를 만나보세요.'
        />

        {/* 지도 + 텍스트 */}
        <div className='flex flex-col sm:flex-row gap-10 mt-10'>
          {/* 지도 */}
          <motion.div
            className='w-full sm:w-1/2 lg:w-2/3 shadow-lg border border-gray-200'
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <KakaoMap />
          </motion.div>
          {/* 텍스트 */}
          <div className='w-full sm:w-1/2 lg:w-1/3 flex items-center justify-center'>
            <div className='text-base md:text-lg leading-relaxed space-y-6 text-three break-keep'>
              <p>
                <strong className='text-two'>신뢰</strong>와{' '}
                <strong className='text-two'>진심</strong>을 바탕으로 언제나
                최선을 다하는 <br />
                <span className='font-semibold text-two'>YD-Industry</span>
                입니다.
              </p>
              <p>
                함께 성장하며,{' '}
                <strong className='text-blue-600'>
                  믿고 맡길 수 있는 파트너
                </strong>
                로 <br />
                고객 곁에 늘 가까이 있겠습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
