import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui';
import Link from 'next/link';
import { menuData } from '@/assets/data';
import { MobileHeader } from './MobileHeader';

export const Header = () => {
  return (
    <div className='flex items-center justify-between fixed w-full h-14 bg-zinc-900 text-center px-10 py-4'>
      <h1>LOGO</h1>
      {/* PC Header */}
      <div className='hidden md:block'>
        <Menubar className='border-none'>
          {menuData.map((menu) => (
            <MenubarMenu key={menu.title}>
              <MenubarTrigger>{menu.title}</MenubarTrigger>
              <MenubarContent>
                {menu.subMenu.map((subItem) => (
                  <Link key={subItem.label} href={subItem.url || ''}>
                    <MenubarItem>{subItem.label}</MenubarItem>
                  </Link>
                ))}
              </MenubarContent>
            </MenubarMenu>
          ))}
        </Menubar>
      </div>
      {/* Mobile Header */}
      <MobileHeader />
    </div>
  );
};
