'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { MobileHeader, DesktopHeader } from './';
import { MenuItem } from '@/types/frame';

export const Header = ({ menuData }: { menuData: MenuItem[] }) => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [mounted, setMounted] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 250);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isHome && <div ref={ref} />}
      <DesktopHeader
        isHome={isHome}
        isScrolled={!inView}
        mounted={mounted}
        menuData={menuData}
      />
      <MobileHeader
        isHome={isHome}
        isScrolled={!inView}
        mounted={mounted}
        menuData={menuData}
      />
    </>
  );
};
