import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { Footer, Header } from '@/components/frame';
import { TopButton } from '@/components/common';
import { getCompanyInfo } from '@/app/api/companyInfo';
import { getMenuData } from '@/app/api/navigationMenu';
import './globals.css';

const notoSans = Noto_Sans_KR({
  variable: '--font-noto-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

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
  const menuData = await getMenuData();
  const companyInfo = await getCompanyInfo();

  return (
    <html lang='ko'>
      <body className={`${notoSans.variable} antialiased`}>
        <Header menuData={menuData} />
        <div>{children}</div>
        <TopButton />
        <Footer companyInfo={companyInfo} />
      </body>
    </html>
  );
}
