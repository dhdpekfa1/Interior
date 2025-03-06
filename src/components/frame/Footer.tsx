import React from 'react';
import { cn } from '@/lib/utils';
import { CompanyInfo, CompanyInfoType } from '@/assets/companyInfo';

const leftFooterData: CompanyInfoType[] = CompanyInfo.slice(0, 4);
const rightFooterData: CompanyInfoType[] = CompanyInfo.slice(4, 8);

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
                href={item.link}
                target='_blank'
                rel='noopener noreferrer'
                className='font-bold'
              >
                {item.content}
              </a>
            ) : item.label === 'E-mail' ? (
              <a href={`mailto:${item.content}`} className='font-bold'>
                {item.content}
              </a>
            ) : (
              <span className='font-bold'>{item.content}</span>
            )}
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-2 mt-6 md:mt-0'>
        {rightFooterData.map((item) => (
          <div key={item.label} className='flex gap-2 text-sm md:text-base'>
            <span className='text-white/70 w-24'>{item.label}</span>
            {item.label === 'TEL' ? (
              <a href='tel:0313346771' className='font-bold'>
                {item.content}
              </a>
            ) : (
              <span className='font-bold'>{item.content}</span>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
};
