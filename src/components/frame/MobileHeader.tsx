import Link from 'next/link';
import Image from 'next/image';
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
import { Menu } from 'lucide-react';
import { menuData } from '@/assets/navMenuData';
import { cn } from '@/lib/utils';

export const MobileHeader = ({
  isHome,
  isScrolled,
}: {
  isHome: boolean;
  isScrolled: boolean;
}) => {
  return (
    <div
      className={cn(
        'md:hidden fixed top-0 left-0 right-0 flex items-center justify-between w-full h-14 text-center px-10 py-4 z-30 transition-all duration-300',
        isHome
          ? isScrolled
            ? 'bg-white text-point shadow'
            : 'bg-transparent text-white'
          : 'bg-point text-white'
      )}
    >
      <Link href='/'>
        <Image src='/assets/logo.png' alt='logo' width={80} height={50} />
      </Link>

      <div className=''>
        <Sheet>
          <SheetTrigger asChild>
            <Menu
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
              <SheetTitle className='text-point'>LOGO</SheetTitle>
              <SheetDescription className='text-gray-400'>
                짧은 소개
              </SheetDescription>
            </SheetHeader>

            {/* 아코디언 메뉴 */}
            <Accordion type='single' collapsible className='w-full'>
              {menuData.map((menu, index) => (
                <AccordionItem key={menu.title} value={`menu-${index}`}>
                  <AccordionTrigger className='text-two hover:text-two'>
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
                </AccordionItem>
              ))}
            </Accordion>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
