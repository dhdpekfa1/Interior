import Image from 'next/image';

export const FirstSection = () => {
  return (
    // <div className='relative w-full h-80 md:h-[40rem] lg:h-[50rem]'>
    //   <div className='w-full h-full px-10 bg-two'>
    //     {/* <div className='w-full h-full px-10 bg-[#fff9f2]'> */}
    //     <Image
    //       src='https://i.postimg.cc/tTHtnnbt/b862903262417634bef2326441e029b39f680905.avif'
    //       alt='배너 테스트'
    //       fill
    //       className='object-container w-full h-full'
    //     />
    //   </div>
    // </div>
    <div className='w-full h-80 md:h-[40rem] lg:h-[50rem] bg-[#fff9f2] flex justify-between'>
      {/* 좌측: 이미지 */}
      <div className='w-1/2 h-full relative'>
        <Image
          src='/assets/banner.png'
          alt='배너 이미지'
          fill
          className='object-contain'
        />
      </div>

      {/* 우측: 텍스트 */}
      <div className='w-1/2 h-full flex flex-col items-start justify-center text-[#423C34] break-keep ml-auto'>
        <div className='md:ml-8 lg:ml-12 flex flex-col gap-1 lg:gap-2'>
          <p className='text-xs sm:text-base md:text-lg lg:text-2xl'>
            지금까지 누구나 꿈꿔왔던 공간을 만들어왔습니다
          </p>
          <p className='text-xs sm:text-base md:text-lg lg:text-2xl'>
            하지만, 만족하고 멈추는 법을 배우기 보다는
          </p>
          <p className='text-xs sm:text-base md:text-lg lg:text-2xl'>
            우리가 만든 공간이 우리를 정의한다는 사실을 믿고
          </p>
          <p className='text-xs sm:text-base md:text-lg lg:text-2xl'>
            더 행복한 공간을 창조하기 위해
          </p>
          <p className='text-xs sm:text-base md:text-lg lg:text-2xl'>
            끊임없이 노력하기를 멈추지 않겠습니다
          </p>
        </div>
      </div>
    </div>
  );
};
