'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
// import Image from 'next/image';
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
import { menuData } from '@/assets/navMenuData';

export const MobileHeader = ({
  isHome,
  isScrolled,
}: {
  isHome: boolean;
  isScrolled: boolean;
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

  const getHeaderClass = () => {
    if (isHome) {
      return isScrolled
        ? 'bg-white text-point shadow'
        : 'bg-transparent text-white';
    }
    return 'bg-point text-white';
  };

  return (
    <div
      className={cn(
        'md:hidden fixed top-0 left-0 right-0 flex items-center justify-between w-full h-14 text-center px-10 py-4 z-30 transition-all duration-300',
        getHeaderClass()
      )}
    >
      <Link href='/'>
        <h2 className='font-bold text-xl sm:text-2xl italic'>YD-INDUSTRY</h2>
        {/* <Image src='/assets/logo.png' alt='logo' width={80} height={50} /> */}
      </Link>

      <div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <AlignRight
              className={cn(
                'cursor-pointer',
                isHome
                  ? 'text-two hover:text-point'
                  : 'text-ef hover:text-white'
              )}
            />
          </SheetTrigger>
          <SheetContent side='left' className='w-64 bg-white'>
            <SheetHeader>
              <SheetTitle className='text-point italic'>YD-INDUSTRY</SheetTitle>
              <SheetDescription className='text-gray-400'>
                짧은 소개
              </SheetDescription>
            </SheetHeader>

            {/* 아코디언 메뉴 */}
            <Accordion type='single' collapsible className='w-full'>
              {menuData.map((menu, index) => (
                <AccordionItem key={menu.title} value={`menu-${index}`}>
                  {menu.subMenu.length > 0 ? (
                    <>
                      <AccordionTrigger className='text-two hover:text-two hover:font-semibold'>
                        {menu.title}
                      </AccordionTrigger>
                      <AccordionContent className='flex flex-col gap-1'>
                        {menu.subMenu.map((subItem) => (
                          <SheetClose asChild key={subItem.label}>
                            <Link
                              href={subItem.url}
                              className='block py-2 pl-4 text-sm hover:font-bold hover:bg-second/70 text-two'
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
