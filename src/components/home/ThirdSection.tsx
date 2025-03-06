import React from 'react';

export const ThirdSection = () => {
  return (
    <section className='relative min-h-[70vh] w-full overflow-hidden'>
      {/* 배경 이미지 */}
      <div
        className='absolute inset-0 bg-fixed bg-center bg-cover'
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=2784&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />
      <div className='absolute inset-0 bg-black/40' />

      {/* 텍스트 */}
      <div className='relative z-10 flex flex-col items-center justify-center min-h-[70vh] text-center text-white px-4'>
        <h1 className='text-4xl md:text-6xl font-bold mb-4'>YD INDUSTRY</h1>
        <p className='text-lg md:text-2xl'>
          편안한 공간을 위한 인테리어 솔루션
        </p>
      </div>
    </section>
  );
};
