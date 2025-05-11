import { cn } from '@/lib/utils';
import { CompanyInfoType } from '@/types/frame';

export const Footer = ({ companyInfo }: { companyInfo: CompanyInfoType[] }) => {
  const leftFooterData = companyInfo.filter(
    (info) => info.direction === 'left'
  );
  const rightFooterData = companyInfo.filter(
    (info) => info.direction === 'right'
  );

  return (
    <footer
      className={cn(
        'bottom-0 left-0 w-full py-10 px-10 bg-gray-500 text-white text-xs sm:text-sm md:text-base',
        'flex flex-col sm:flex-row sm:justify-between md:justify-around'
      )}
    >
      <div className='flex flex-col gap-2'>
        {leftFooterData.map((item) => (
          <div key={item.label} className='flex gap-2'>
            <span className='text-white/70 w-20'>{item.label}</span>
            {item.label === '주소' ? (
              <a
                href={item.link}
                target='_blank'
                rel='noopener noreferrer'
                className='font-medium'
              >
                {item.content}
              </a>
            ) : item.label === 'E-mail' ? (
              <a href={`mailto:${item.content}`} className='font-medium'>
                {item.content}
              </a>
            ) : (
              <span className='font-medium'>{item.content}</span>
            )}
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-2 mt-2 sm:mt-0'>
        {rightFooterData.map((item) => (
          <div key={item.label} className='flex gap-2'>
            <span className='text-white/70 w-24'>{item.label}</span>
            {item.label === 'TEL' ? (
              <a href='tel:0324723661' className='font-medium'>
                {item.content}
              </a>
            ) : (
              <span className='font-medium'>{item.content}</span>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
};
