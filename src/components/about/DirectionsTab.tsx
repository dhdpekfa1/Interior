import { SubTitle } from '@/components/common';

export const DirectionsTab = () => {
  // TODO: 클릭 시 바로가기 추가(주소 -> 길찾기, 전화번호 -> 전화)
  const contact = [
    { label: '주소', info: '서울특별시 서초구 쨔란 5번길 2 1014호0' },
    { label: '전화번호', info: '032-101-2020' },
    { label: '팩스', info: '032-101-2020' },
  ];
  return (
    <div className='wrapper'>
      <SubTitle title='찾아오기' />
      <div
        className='bg-cream'
        style={{
          // 지도 크기
          width: '100%',
          height: 'calc(50vh)',
        }}
      >
        지도
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-4 md:mx-4 my-6'>
        {contact.map((item) => (
          <div
            key={item.label}
            className='flex flex-col items-center gap-3 bg-second/80 rounded-sm p-3 w-full'
          >
            <p className='text-base md:text-lg font-bold text-point'>
              {item.label}
            </p>
            <div className='w-[85%] h-0.5 bg-cream' />
            <p className='text-base md:text-lg font-bold text-ef'>
              {item.info}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
