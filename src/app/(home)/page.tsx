'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import { FirstSlide, SecondSlide, ThirdSlide } from '@/components/home';

export default function HomePage() {
  const slides = [
    <FirstSlide key={1} />,
    <SecondSlide key={2} />,
    <ThirdSlide key={3} />,
  ];

  return (
    <div className='relative w-full h-screen'>
      <section className='w-full h-screen'>
        <Swiper
          direction='vertical'
          slidesPerView={1}
          spaceBetween={0}
          mousewheel={{ forceToAxis: true }}
          speed={900}
          modules={[Mousewheel]}
          className='w-full h-full'
        >
          {slides.map((number, index) => (
            <SwiperSlide
              key={index}
              className='w-full h-screen flex justify-center items-center text-5xl font-bold bg-gray-800 text-white'
            >
              {number}
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-lg'>
        {slides.length}개 슬라이드 중 {slides[0]}번째
      </div>
    </div>
  );
}
