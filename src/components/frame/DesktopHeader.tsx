'use client';

import Link from 'next/link';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui';
import { menuData } from '@/assets/navMenuData';

export const DesktopMenubar = () => {
  return (
    <div className='hidden md:block'>
      <Menubar className='border-none bg-point text-second'>
        {menuData.map((menu) => (
          <MenubarMenu key={menu.title}>
            <MenubarTrigger>
              <span className='font-bold'>{menu.title}</span>
            </MenubarTrigger>
            <MenubarContent className='bg-point p-2 border-second/30'>
              {menu.subMenu.map((subItem) => (
                <Link key={subItem.label} href={subItem.url || ''}>
                  <MenubarItem className='text-white hover:bg-gray-100 transition focus:bg-second/70 focus:text-ef focus:font-semibold'>
                    {subItem.label}
                  </MenubarItem>
                </Link>
              ))}
            </MenubarContent>
          </MenubarMenu>
        ))}
      </Menubar>
    </div>
  );
};
