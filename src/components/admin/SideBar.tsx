'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Inbox, Settings, Building } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui';
import { cn } from '@/lib/utils';

const items = [
  {
    title: 'Home',
    url: '/admin/dashboard',
    icon: Home,
  },
  {
    title: '상품 관리',
    url: '/admin/dashboard/product',
    icon: Inbox,
  },
  {
    title: '회사 정보',
    url: '/admin/dashboard/company-info',
    icon: Building,
  },
  {
    title: '설정',
    url: '/admin/dashboard/settings',
    icon: Settings,
  },
];

const SideBar = () => {
  const pathname = usePathname();

  return (
    <Sidebar className='mt-14'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>관리자 메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <div
                          className={cn(
                            'flex items-center gap-2 p-2 rounded-md',
                            isActive
                              ? 'bg-point text-second font-semibold'
                              : 'text-point font-semibold'
                          )}
                        >
                          <item.icon className='w-4 h-4' />
                          <span>{item.title}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;
