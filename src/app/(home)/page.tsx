import {
  FirstSlide,
  SecondSlide,
  ThirdSlide,
  FourthSlide,
} from '@/components/home';

export default function HomePage() {
  return (
    <div className='relative w-full'>
      <section className='w-full'>
        <FirstSlide key={1} />
        <SecondSlide key={2} />
        <ThirdSlide key={3} />
        <FourthSlide key={4} />
      </section>
    </div>
  );
}
