import type { Metadata } from 'next';
import { Footer, Header } from '@/components/frame';
import { TopButton } from '@/components/common';
import MenuData from '@/assets/data/menuData.json';
import companyInfo from '@/assets/data/companyInfo.json';
import './globals.css';
import { CompanyInfoType } from '@/types/frame';

export const metadata: Metadata = {
  title: 'YD-Industry',
  description:
    '㈜YD인더스트리는 대한민국을 대표하는 친환경 목재 가공 전문 기업입니다.',
  icons: {
    icon: '/assets/logo.png',
  },
  openGraph: {
    title: 'YD-Industry',
    description:
      '㈜YD인더스트리는 대한민국을 대표하는 친환경 목재 가공 전문 기업입니다.',
    images: [
      {
        url: '/assets/thumbnail.png',
        width: 800,
        height: 600,
        alt: 'YD-Industry thumbnail',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YD-Industry',
    description:
      '㈜YD인더스트리는 대한민국을 대표하는 친환경 목재 가공 전문 기업입니다.',
    images: ['/assets/thumbnail.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const companyInfoData = companyInfo as CompanyInfoType[];
  return (
    <html lang='ko'>
      <body className='antialiased font-sans'>
        <Header menuData={MenuData} />
        <div>{children}</div>
        <TopButton />
        <Footer companyInfo={companyInfoData} />
      </body>
    </html>
  );
}
