'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { menuData } from '@/assets/navMenuData';
import { cn } from '@/lib/utils';

export const DesktopHeader = ({
  isHome,
  isScrolled,
}: {
  isHome: boolean;
  isScrolled: boolean;
}) => {
  const [isHover, setIsHover] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 280);
    return () => clearTimeout(timeout);
  }, []);

  const getHeaderClass = () => {
    if (isHover) return 'h-[260px] bg-white text-point shadow-lg';
    if (isHome) {
      if (isScrolled) return 'h-[80px] bg-white text-point shadow-md';
      return 'h-[80px] bg-transparent text-white';
    }
    return 'h-[80px] bg-point text-white';
  };

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 hidden md:flex flex-col items-center w-full',
        'transition-all duration-500 ease-in-out',
        mounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0',
        getHeaderClass()
      )}
    >
      {/* 헤더 상단 */}
      <div className='w-full max-w-7xl flex items-center justify-between px-10 h-[80px]'>
        {/* 로고 */}
        <Link href='/'>
          <Image src='/assets/logo.png' alt='logo' width={80} height={50} />
        </Link>

        {/* 메뉴 */}
        <nav>
          <ul className='flex gap-10 text-lg font-semibold relative'>
            {menuData.map((menu) => (
              <li
                key={menu.title}
                className={cn(
                  'relative flex flex-col items-center group',
                  isHover && 'text-point'
                )}
              >
                {/* 메인 메뉴 */}
                <Link
                  href={menu.baseUrl}
                  className='h-[80px] flex items-center border-b-4 border-transparent group-hover:border-point transition-colors'
                >
                  {menu.title}
                </Link>

                {/* 서브 메뉴 */}
                <ul
                  className={cn(
                    'absolute top-[80px] mt-2 flex flex-col gap-2 p-4 rounded-md transition-all duration-100',
                    isHover ? 'opacity-100 visible' : 'opacity-0 invisible'
                  )}
                >
                  {menu.subMenu.map((subItem) => (
                    <li
                      key={subItem.label}
                      className='text-sm whitespace-nowrap text-three/80 hover:text-point hover:font-semibold'
                    >
                      <Link href={subItem.url}>{subItem.label}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
