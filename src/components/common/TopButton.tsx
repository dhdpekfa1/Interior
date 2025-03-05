'use client';

import { useInView } from 'react-intersection-observer';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

export const TopButton = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div ref={ref} className='absolute top-0 w-full h-1' />
      <Button
        onClick={scrollToTop}
        className={cn(
          'fixed bottom-6 right-6 md:bottom-10 p-3 md:p-4 text-white shadow-lg flex items-center gap-1',
          'bg-two hover:bg-point group',
          'transition-all duration-500',
          inView
            ? 'translate-x-full opacity-0 pointer-events-none'
            : 'translate-x-0 opacity-100 pointer-events-auto'
        )}
      >
        <ArrowUp className='w-4 h-4 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-y-[-2px]' />
        <p className='text-[10px] sm:text-sm transition-transform duration-300 group-hover:translate-y-[-2px]'>
          TOP
        </p>
        <span className='sr-only'>맨 위로 이동</span>
      </Button>
    </>
  );
};
