'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import {
  Card,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from '@/components/ui';

const slides = [
  {
    img: 'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: '편안함이 머무는 공간',
    desc: '사람을 편안하게 하는, 안락한 인테리어를 완성합니다.',
  },
  {
    img: 'https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: '삶에 품격을 더하다',
    desc: '당신만의 감성을 담아내는 공간을 함께 만들어갑니다.',
  },
  {
    img: 'https://images.unsplash.com/photo-1618221639244-c1a8502c0eb9?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: '디자인과 기능, 그 이상의 가치',
    desc: '섬세한 디테일과 신뢰를 바탕으로 공간을 완성합니다.',
  },
];

export const FirstSection = () => {
  const [current, setCurrent] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setCurrent(carouselApi.selectedScrollSnap());
    };

    carouselApi.on('select', onSelect);

    setCurrent(carouselApi.selectedScrollSnap());

    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi]);

  return (
    <div className='relative w-full'>
      <Carousel
        setApi={setCarouselApi}
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
        className='relative group'
      >
        <CarouselContent className='h-80 md:h-[40rem] lg:h-screen'>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <Card className='w-full h-full border-none relative'>
                <Image
                  src={slide.img}
                  alt={slide.title}
                  width={400}
                  height={300}
                  priority
                  className='w-full h-full object-cover object-center'
                />
                <div className='absolute inset-0 flex flex-col items-center justify-center text-center text-white shadow-sm backdrop-brightness-75'>
                  <h3 className='text-2xl lg:text-4xl font-bold'>
                    {slide.title}
                  </h3>
                  <p className='mt-3 text-sm md:text-lg font-medium drop-shadow'>
                    {slide.desc}
                  </p>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* 버튼 */}
        <CarouselPrevious
          className='absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-two/60 text-white/70 
               hover:bg-two/70 hover:text-white
               opacity-0 group-hover:opacity-100 transition-opacity duration-300'
        />
        <CarouselNext
          className='absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-two/60 text-white/70 
               hover:bg-two/70 hover:text-white
               opacity-0 group-hover:opacity-100 transition-opacity duration-300'
        />
      </Carousel>

      {/* 인디케이터 */}
      <div className='absolute left-8 bottom-8 flex items-center justify-center gap-2 z-20'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => carouselApi?.scrollTo(index)}
            className={`w-1 h-0.5 md:w-2 md:h-1 rounded-none ${
              current === index ? 'h-1 w-2 md:w-4 bg-white' : 'bg-white/50'
            } transition-all`}
          />
        ))}
      </div>
    </div>
  );
};
