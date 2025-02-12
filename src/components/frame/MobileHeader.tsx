import {
  Sheet,
  // SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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
          <Button variant='outline'>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='w-64'>
          <SheetHeader>
            <SheetTitle>LOGO</SheetTitle>
            <SheetDescription>짧은 소개</SheetDescription>
          </SheetHeader>

          {/* ✅ 아코디언 메뉴 */}
          <Accordion type='single' collapsible className='w-full'>
            {menuData.map((menu, index) => (
              <AccordionItem key={menu.title} value={`menu-${index}`}>
                <AccordionTrigger>{menu.title}</AccordionTrigger>
                <AccordionContent>
                  {menu.subMenu.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.url}
                      className='block py-2 pl-4 text-sm hover:font-bold'
                    >
                      {subItem.label}
                    </Link>
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
