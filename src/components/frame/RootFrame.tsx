'use client';

import { usePathname } from 'next/navigation';
import { Footer, Header } from '@/components/frame';
import { TopButton } from '@/components/common';
import MenuData from '@/assets/data/menuData.json';
import companyInfo from '@/assets/data/companyInfo.json';
import { CompanyInfoType } from '@/types/frame';

export function RootFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const companyInfoData = companyInfo as CompanyInfoType[];

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header menuData={MenuData} />
      <div>{children}</div>
      <TopButton />
      <Footer companyInfo={companyInfoData} />
    </>
  );
}
