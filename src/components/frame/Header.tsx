'use client';
import { usePathname } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { MobileHeader, DesktopHeader } from './';
import {} from './DesktopHeader';
import { cn } from '@/lib/utils';

export const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <div className={cn(!isHome && 'mb-14 md:mb-20')}>
      {isHome && <div ref={ref} />}
      <DesktopHeader isHome={isHome} isScrolled={!inView} />
      <MobileHeader isHome={isHome} isScrolled={!inView} />
    </div>
  );
};
