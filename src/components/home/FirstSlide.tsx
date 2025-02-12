import Link from 'next/link';
import { menuData } from '@/assets/data';

export const FirstSlide = () => {
  const data = menuData.find((data) => data.title === '제품소개');

  if (!data || !data.subMenu) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div className='w-full h-screen flex'>
      {data.subMenu.map((item) => (
        <div
          key={item.label}
          className='group relative duration-500 ease-in-out w-full h-[20%] max-sm:hover:h-[40%] md:w-[20%] md:h-full md:hover:w-[40%] flex items-center justify-center'
        >
          <div
            className='absolute inset-0 bg-cover bg-center transition-all duration-500'
            style={{ backgroundImage: `url(${item.img})` }}
          />
          <div className='relative z-10 flex flex-col items-center justify-center text-white duration-300'>
            <h2 className='text-2xl font-bold'>{item.label}</h2>
            <Link
              href={item.url}
              className='mt-2 inline-block px-4 py-2 bg-second hover:bg-blue rounded-lg text-white text-sm'
            >
              제품 보기
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
