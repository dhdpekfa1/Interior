import Link from 'next/link';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui';
import { MobileHeader } from './MobileHeader';
import { menuData } from '@/assets/data';

export const Header = () => {
  return (
    <div className='fixed top-0 left-0 right-0 flex items-center justify-between w-full h-14 bg-point text-center px-10 py-4 z-10'>
      <Link href={'/'}>
        <h1 className='text-second text-lg md:text-2xl font-bold'>LOGO</h1>
      </Link>

      {/* PC Header */}
      <div className='hidden md:block'>
        <Menubar className='border-none bg-point text-second'>
          {menuData.map((menu) => (
            <MenubarMenu key={menu.title}>
              <MenubarTrigger>
                <span className='font-bold'>{menu.title}</span>
              </MenubarTrigger>
              <MenubarContent className='bg-second p-2'>
                {menu.subMenu.map((subItem) => (
                  <Link key={subItem.label} href={subItem.url || ''}>
                    <MenubarItem className='text-white hover:bg-gray-100 transition'>
                      {subItem.label}
                    </MenubarItem>
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
