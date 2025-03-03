import Image from 'next/image';
import Link from 'next/link';
import { menuData } from '@/assets/navMenuData';
import { Button } from '@/components/ui';

export const SecondSlide = () => {
  const data = menuData.find((data) => data.title === '제품소개');

  if (!data || !data.subMenu) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div className='w-full h-full grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-4 px-4 py-10'>
      {data.subMenu.map((item) => (
        <Link
          href={item.url}
          key={item.label}
          className='flex flex-col items-center gap-4 group'
        >
          {/* 이미지 */}
          <div className='flex items-center justify-center w-[85%] lg:w-full h-[180px] md:h-[380px] overflow-hidden rounded-md'>
            <Image
              src={item.img!}
              alt={item.label}
              width={300}
              height={200}
              className='w-full md:w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110'
            />
          </div>

          {/* 텍스트 + 버튼 */}
          <div className='text-center'>
            <h2 className='text-lg md:text-xl font-bold text-white'>
              {item.label}
            </h2>
            <Button className='mt-2 px-3 py-1 border bg-point/80 border-second/70 rounded-lg text-white text-xs md:text-sm transition-all duration-300 group-hover:bg-second/80 mb-6'>
              제품 보기
            </Button>
          </div>
        </Link>
      ))}
    </div>
  );
};
