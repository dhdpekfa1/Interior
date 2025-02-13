import { cn } from '@/lib/utils';
import { Phone, Contact } from 'lucide-react';

export const QuickInquiry = () => {
  return (
    <div
      className={cn(
        'fixed bottom-8 right-8 rounded-md z-50',
        // 'flex flex-col gap-1 sm:gap-2',
        ' text-[10px] sm:text-xs md:text-sm',
        'bg-dd'
      )}
    >
      {/* 회사 */}
      <div className='flex gap-2 bg-blue rounded-t-md p-1 text-four'>
        <span className='flex gap-2 items-center'>
          <Contact className='h-auto w-3 sm:w-4' /> 빠른 견적 문의
        </span>
        <span>032-101-2020</span>
      </div>
      {/* 핸드폰 */}
      <div className='flex gap-2 bg-[#567C8D] rounded-b-md p-1 text-cream'>
        <span className='flex gap-2 items-center'>
          <Phone className='h-auto w-3 sm:w-4' /> 빠른 견적 문의
        </span>
        <span className=''>010-2020-3030</span>
      </div>
    </div>
  );
};
