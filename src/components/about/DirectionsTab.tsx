import { SubTitle } from '@/components/common';
import { Separator } from '@/components/ui';
import { KakaoMap } from '@/components/common/KakaoMap';

export const DirectionsTab = () => {
  // TODO: 데이터 받으면 수정
  const contact = [
    {
      label: '주소',
      info: '경기도 평택시 청북읍 드림산단7로 36',
      link: `https://map.kakao.com/?map_type=TYPE_MAP&target=car&rt=%2C%2C523953%2C1084098&rt1=&rt2=%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%8C%90%EA%B5%90%EC%98%A4%ED%94%BC%EC%8A%A4&rtIds=%2C&rtTypes=%2C`, // Kakao Maps 길찾기
    },
    {
      label: '전화번호',
      info: '031-334-6771',
      link: 'tel:031-334-6771', // 전화 앱 열기
    },
    {
      label: '팩스',
      info: '031-334-6771',
    },
  ];

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
                {item.info}
              </a>
            ) : (
              <p className='text-base md:text-lg font-bold text-white break-keep'>
                {item.info}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
