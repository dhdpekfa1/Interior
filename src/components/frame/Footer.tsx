import React from 'react';
import { cn } from '@/lib/utils';

const footerData = [
  { label: '상호명', content: '회사명' },
  { label: '주소', content: '서울특별시 서초구 쨔란 5번길 2 1014호' },
  {
    label: '대표자명',
    content: '대표자명: 박주향 | 사업자등록번호: 000-03-7830',
  },
  {
    label: '대표번호',
    content: '대표번호: 032-101-2020 | 팩스: 032-101-2020',
  },
  {
    label: '연락처',
    content: '핸드폰: 010-2020-3030 | 이메일: test@naver.com',
  },
  {
    label: '계좌번호',
    content: '계좌번호: 신한 아무개 110-483-3898391',
  },
];

export const Footer = () => {
  return (
    <footer
      className={cn(
        'bottom-0 left-0 w-full py-4 px-10  bg-point',
        'flex items-start justify-start gap-8'
      )}
    >
      <h1 className={cn('text-second text-lg md:text-2xl font-bold')}>LOGO</h1>
      <div className='text-ef/70 text-[10px] sm:text-sm md:text-base'>
        <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10'>
          {footerData.map((data) => (
            <p key={data.label}>{data.content}</p>
          ))}
        </div>
      </div>
    </footer>
  );
};
