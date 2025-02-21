import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  Button,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui';
import { Menu } from 'lucide-react';
import { menuData } from '@/assets/data';
import Link from 'next/link';

export const MobileHeader = () => {
  return (
    <div className='block md:hidden'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' className='px-2 h-fit'>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='w-64 bg-second'>
          <SheetHeader>
            <SheetTitle className='text-point'>LOGO</SheetTitle>
            <SheetDescription className='text-ef'>짧은 소개</SheetDescription>
          </SheetHeader>

          {/* 아코디언 메뉴 */}
          <Accordion type='single' collapsible className='w-full'>
            {menuData.map((menu, index) => (
              <AccordionItem key={menu.title} value={`menu-${index}`}>
                <AccordionTrigger>{menu.title}</AccordionTrigger>
                <AccordionContent className='flex flex-col gap-1'>
                  {menu.subMenu.map((subItem) => (
                    <SheetClose asChild key={subItem.label}>
                      <Link
                        href={subItem.url}
                        className='block py-2 pl-4 text-sm hover:font-bold bg-point/90 hover:bg-point rounded-sm text-white'
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
  );
};
