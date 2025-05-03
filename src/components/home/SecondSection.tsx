import { SecondSectionClient, SectionHeader } from '@/components/home';
import { getProductHome } from '@/app/api/\bproduct';

export const SecondSection = async () => {
  const productHomeData = await getProductHome();

  if (!productHomeData) {
    return (
      <div className='w-full flex flex-wrap justify-center gap-8 px-4 py-10'>
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className='w-[90%] md:w-[30%] flex flex-col items-center gap-4 animate-pulse'
          >
            <div className='w-full h-[30rem] md:h-[380px] bg-gray-200 rounded-md' />
            <div className='w-1/2 h-5 bg-gray-200 rounded-md mt-4' />
            <div className='w-24 h-8 bg-gray-200 rounded-md mt-2' />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <SectionHeader
        title='우리의 제품'
        description='최고의 품질과 기술력으로 완성된 제품을 소개합니다.'
      />
      <div className='w-full flex flex-wrap justify-center gap-4 md:gap-8 px-4'>
        <SecondSectionClient productHomeData={productHomeData} />
      </div>
    </>
  );
};
