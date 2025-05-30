'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui';
import { AlignRight } from 'lucide-react';
import { MenuItem } from '@/types/frame';

export const MobileHeader = ({
  // isHome,
  isScrolled,
  mounted,
  menuData,
}: {
  isHome: boolean;
  isScrolled: boolean;
  mounted: boolean;
  menuData: MenuItem[];
}) => {
  const [open, setOpen] = useState(false);

  // 화면 md 이상: Sheet 닫기
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleResize = () => {
      if (mediaQuery.matches) {
        setOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const getStyle = (type: 'header' | 'icon') => {
    switch (type) {
      case 'header':
        return isScrolled
          ? 'bg-white text-point shadow'
          : 'bg-transparent text-white';

      case 'icon':
        return isScrolled
          ? 'text-two hover:text-point'
          : 'text-white hover:text-point';

      default:
        return '';
    }
  };

  /** 홈 화면만 스크롤 적용 */
  // const getStyle = (type: 'header' | 'icon') => {
  //   switch (type) {
  //     case 'header':
  //       if (isHome) {
  //         return isScrolled
  //           ? 'bg-white text-point shadow'
  //           : 'bg-transparent text-white';
  //       } else {
  //         return 'bg-transparent text-point'; // 일단 홈이랑 동일하게 변경
  //         // return 'bg-point text-white';
  //       }

  //     case 'icon':
  //       if (isHome) {
  //         return isScrolled ? 'text-two hover:text-point' : 'text-point';
  //         // return isScrolled ? 'text-two hover:text-point' : 'text-white';
  //       } else {
  //         return 'text-point hover:text-white';
  //         // return 'text-ef hover:text-white';
  //       }

  //     default:
  //       return '';
  //   }
  // };

  return (
    <div
      className={cn(
        'md:hidden fixed top-0 left-0 right-0 flex items-center justify-between w-full h-14 text-center px-10 py-4 z-30 transition-all duration-500 ease-in-out',
        mounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0',
        getStyle('header')
      )}
    >
      <Link href='/'>
        <Image src='/assets/logo.png' alt='logo' width={68} height={50} />
      </Link>

      <div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <AlignRight className={cn('cursor-pointer', getStyle('icon'))} />
          </SheetTrigger>
          <SheetContent side='right' className='w-64 bg-white'>
            <SheetHeader>
              <SheetTitle className='text-point italic'>YD-INDUSTRY</SheetTitle>
              <SheetDescription className='text-gray-400'>
                신뢰로 미래를 설계하다.
              </SheetDescription>
            </SheetHeader>

            {/* 아코디언 메뉴 */}
            <Accordion type='single' collapsible className='w-full'>
              {menuData.map((menu, index) => (
                <AccordionItem key={menu.title} value={`menu-${index}`}>
                  {menu.subMenu.length > 0 ? (
                    <>
                      <AccordionTrigger className='text-two hover:text-two hover:font-medium'>
                        {menu.title}
                      </AccordionTrigger>
                      <AccordionContent className='flex flex-col gap-1'>
                        {menu.subMenu.map((subItem) => (
                          <SheetClose asChild key={subItem.label}>
                            <Link
                              href={subItem.url}
                              className='block py-2 pl-4 text-sm hover:font-medium hover:bg-second/70 text-two'
                            >
                              {subItem.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </AccordionContent>
                    </>
                  ) : (
                    <SheetClose asChild>
                      <Link
                        href={menu.baseUrl}
                        className='flex flex-1 items-center justify-between py-4 text-two hover:text-two hover:font-semibold'
                      >
                        {menu.title}
                      </Link>
                    </SheetClose>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
