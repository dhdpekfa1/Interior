import { SubTitle } from '@/components/common';
import { Separator } from '@/components/ui';
import { KakaoMap } from '@/components/common/KakaoMap';
import { CompanyInfo } from '@/assets/companyInfo';

export const DirectionsTab = () => {
  const contact = CompanyInfo.filter((item) =>
    ['주소', 'TEL', 'FAX'].includes(item.label)
  );

  return (
    <div className='wrapper'>
      <SubTitle title='오시는 길' />

      {/* 지도 */}
      <KakaoMap />
      <Separator className='my-4' />
      <div className='grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-4'>
        {contact.map((item) => (
          <div
            key={item.label}
            className='flex flex-col items-center gap-3 bg-point p-3 w-full h-full'
          >
            <p className='text-base sm:text-sm md:text-lg font-bold text-white'>
              {item.label}
            </p>
            <Separator className='w-[90%]' />
            {item.link ? (
              <a
                href={item.link}
                target={item.label === '주소' ? '_blank' : '_self'}
                rel='noopener noreferrer'
                className='text-base md:text-lg font-bold text-white hover:underline text-center break-keep'
              >
                {item.content}
              </a>
            ) : (
              <p className='text-base md:text-lg font-bold text-white break-keep'>
                {item.content}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
