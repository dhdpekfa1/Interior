import { SubTitle } from '@/components/common';
import { Button } from '../ui';

export const DirectionsTab = () => {
  // TODO: 데이터 받으면 수정
  const contact = [
    {
      label: '주소',
      info: '경기도 평택시 청북읍 드림산단7로 36',
      link: `https://map.naver.com/p/entry/address/14134031.107402,4448179.4054819,%EA%B2%BD%EA%B8%B0%20%ED%8F%89%ED%83%9D%EC%8B%9C%20%EC%B2%AD%EB%B6%81%EC%9D%8D%20%EB%93%9C%EB%A6%BC%EC%82%B0%EB%8B%A87%EB%A1%9C%2036?c=17.00,0,0,0,dh`, // Naver Maps 길찾기
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
      <div
        className='bg-cream'
        style={{
          width: '100%',
          height: 'calc(50vh)',
        }}
      >
        지도
      </div>

      <div className='w-full flex items-end justify-end my-6'>
        <Button
          variant='ghost'
          className='border border-point hover:bg-point hover:text-white'
          // onClick={() => console.log('TODO: 바로가기 연동')}
        >
          바로가기
        </Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-4'>
        {contact.map((item) => (
          <div
            key={item.label}
            className='flex flex-col items-center gap-3 bg-point p-3 w-full h-full'
          >
            <p className='text-base sm:text-sm md:text-lg font-bold text-white'>
              {item.label}
            </p>
            <div className='w-[85%] h-0.5 bg-dd/50' />
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
