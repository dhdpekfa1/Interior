import React from 'react';
import { cn } from '@/lib/utils';

const leftFooterData = [
  { label: '회사명', content: '데코밸리(주)' },
  { label: '대표이사', content: '송영관' },
  { label: '주소', content: '경기도 평택시 청북읍 드림산단7로 36' },
  { label: 'E-mail', content: 'decovalley@naver.com' },
];

const rightFooterData = [
  { label: 'TEL', content: '031-334-6771~2' },
  { label: 'FAX', content: '031-334-6773' },
  { label: '사업자 번호', content: '142-81-12527' },
  { label: 'blog', content: 'blog.naver.com/decovalley' },
];
export const Footer = () => {
  return (
    <footer
      className={cn(
        'bottom-0 left-0 w-full py-10 px-10 bg-gray-500 text-white text-xs sm:text-sm md:text-base',
        'flex flex-col sm:flex-row sm:justify-between md:justify-around'
      )}
    >
      <div className='flex flex-col gap-2'>
        {leftFooterData.map((item) => (
          <div key={item.label} className='flex gap-2 text-sm md:text-base'>
            <span className='text-white/70 w-20'>{item.label}</span>
            <span>{item.content}</span>
          </div>
        ))}
      </div>
      <div className='flex flex-col gap-2 mt-6 md:mt-0'>
        {rightFooterData.map((item) => (
          <div key={item.label} className='flex gap-2 text-sm md:text-base'>
            <span className='text-white/70 w-24'>{item.label}</span>
            <span>{item.content}</span>
          </div>
        ))}
      </div>
    </footer>
  );
};
