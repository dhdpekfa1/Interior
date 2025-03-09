import type { Metadata } from 'next';
import '@/app/globals.css';
import SideBar from '@/components/admin/SideBar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui';

export const metadata: Metadata = {
  title: 'YD-Industry',
  description: 'YD-Industry 관리자 페이지',
};

export default function AdminDashBoardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <div className='flex min-h-screen'>
        <SideBar />
        <div className='flex flex-col flex-1 min-h-screen'>
          <main className='container'>
            <SidebarTrigger />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
