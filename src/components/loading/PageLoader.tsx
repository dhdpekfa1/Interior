export const PageLoader = () => {
  const text = 'YD-INDUSTRY';
  const delayInterval = 0.15; // 글자 간 딜레이

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999]'>
      <div className='relative flex text-3xl md:text-5xl font-bold text-point mb-6'>
        {text.split('').map((letter, index) => (
          <span
            key={index}
            className='letter-pop'
            style={{
              animationDelay: `${index * delayInterval}s`,
              animationDuration: `${text.length * delayInterval + 1}s`, // 전체 텍스트 기준 반복 타이밍
            }}
          >
            {letter}
          </span>
        ))}
        {/* 빛 효과 */}
        <div className='logo-shine' />
      </div>

      {/* 로딩 바 */}
      <div className='w-1/3 lg:w-[20%] overflow-hidden'>
        <div className='loader-bar' />
      </div>
    </div>
  );
};
