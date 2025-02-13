import { SubTitle } from '@/components/common';

export const DirectionsTab = () => {
  const contact = [
    {
      label: '주소',
      info: '서울시 서초구 쨔란 5번길',
      link: `https://www.google.com/maps/search/?q=서울 특별시 서초구 쨔란 5번길`, // Google Maps 길찾기
    },
    {
      label: '전화번호',
      info: '032-101-2020',
      link: 'tel:0321012020', // 전화 앱 열기
    },
    {
      label: '팩스',
      info: '032-101-2020',
    },
  ];

  return (
    <div className='wrapper'>
      <SubTitle title='찾아오기' />
      <div
        className='bg-cream'
        style={{
          width: '100%',
          height: 'calc(50vh)',
        }}
      >
        지도
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-4 md:mx-1 my-6'>
        {contact.map((item) => (
          <div
            key={item.label}
            className='flex flex-col items-center gap-3 bg-point rounded-sm p-3 w-full'
          >
            <p className='text-base sm:text-sm md:text-lg font-bold text-ef'>
              {item.label}
            </p>
            <div className='w-[85%] h-0.5 bg-dd/50' />
            {item.link ? (
              <a
                href={item.link}
                target={item.label === '주소' ? '_blank' : '_self'}
                rel='noopener noreferrer'
                className='text-base md:text-lg font-bold text-dd hover:underline'
              >
                {item.info}
              </a>
            ) : (
              <p className='text-base md:text-lg font-bold text-dd'>
                {item.info}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
