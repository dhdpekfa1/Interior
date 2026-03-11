import { cn } from '@/lib/utils';
import { CompanyInfoType } from '@/types/frame';
import Link from 'next/link';

const normalizeHref = (item: CompanyInfoType) => {
  if (!item.link) return null;
  if (item.link.startsWith('/')) return item.link;
  if (item.link.startsWith('http')) return item.link;
  if (item.link.includes('@')) return `mailto:${item.link}`;
  if (/^\d[\d-]+$/.test(item.link)) return `tel:${item.link.replace(/-/g, '')}`;
  return item.link;
};

export const Footer = ({ companyInfo }: { companyInfo: CompanyInfoType[] }) => {
  const leftFooterData = companyInfo.filter(
    (info) => info.direction === 'left',
  );
  const rightFooterData = companyInfo.filter(
    (info) => info.direction === 'right',
  );

  return (
    <footer
      className={cn(
        'bottom-0 left-0 w-full py-10 px-10 bg-point/95 text-white text-xs sm:text-sm md:text-base',
        'flex flex-col sm:flex-row sm:justify-between md:justify-around',
      )}
    >
      <div className='flex flex-col gap-2'>
        {leftFooterData.map((item) => (
          <div key={item.label} className='flex gap-2'>
            <span className='text-white/70 w-20'>{item.label}</span>
            {normalizeHref(item)?.startsWith('/') ? (
              <Link
                href={normalizeHref(item)!}
                className='font-medium cursor-pointer'
              >
                {item.content}
              </Link>
            ) : normalizeHref(item) ? (
              <a
                href={normalizeHref(item)!}
                target={
                  normalizeHref(item)!.startsWith('http') ? '_blank' : undefined
                }
                rel={
                  normalizeHref(item)!.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                className='font-medium cursor-pointer'
              >
                {item.content}
              </a>
            ) : item.label === 'E-mail' ? (
              <a
                href={`mailto:${item.content}`}
                className='font-medium cursor-pointer'
              >
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
