'use client';
import { usePathname } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { MobileHeader, DesktopHeader } from './';

export const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <>
      {isHome && <div ref={ref} />}
      <DesktopHeader isHome={isHome} isScrolled={!inView} />
      <MobileHeader isHome={isHome} isScrolled={!inView} />
    </>
  );
};
