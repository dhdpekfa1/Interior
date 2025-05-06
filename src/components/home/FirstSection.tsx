import Image from 'next/image';

export const FirstSection = () => {
  return (
    <div className='relative w-full h-80 md:h-[40rem] '>
      <Image
        src='https://i.postimg.cc/tTHtnnbt/b862903262417634bef2326441e029b39f680905.avif'
        alt='배너 테스트'
        fill
        className='object-cover w-full h-full'
      />
    </div>
  );
};
