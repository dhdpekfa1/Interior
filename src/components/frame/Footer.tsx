import React from 'react';
import { cn } from '@/lib/utils';

// TODO: 데이터 받으면 수정
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
  { label: '계좌번호', content: '000-000000-000' },
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
            {item.label === '주소' ? (
              <a
                href='https://map.naver.com/p/search/경기도%20평택시%20청북읍%20드림산단7로%2036'
                target='_blank'
                rel='noopener noreferrer'
              >
                {item.content}
              </a>
            ) : item.label === 'E-mail' ? (
              <a href={`mailto:${item.content}`}>{item.content}</a>
            ) : (
              <span>{item.content}</span>
            )}
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-2 mt-6 md:mt-0'>
        {rightFooterData.map((item) => (
          <div key={item.label} className='flex gap-2 text-sm md:text-base'>
            <span className='text-white/70 w-24'>{item.label}</span>
            {item.label === 'TEL' ? (
              <a href='tel:0313346771'>{item.content}</a>
            ) : (
              <span>{item.content}</span>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
};
