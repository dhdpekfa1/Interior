import {
  FirstSection,
  SecondSection,
  ThirdSection,
  FourthSection,
} from '@/components/home';

export default function HomePage() {
  return (
    <div className='relative w-full'>
      <section className='w-full'>
        <FirstSection key={1} />
        <SecondSection key={2} />
        <ThirdSection key={3} />
        <FourthSection key={4} />
      </section>
    </div>
  );
}
