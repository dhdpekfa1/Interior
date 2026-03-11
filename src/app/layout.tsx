import type { Metadata } from 'next';
import { Toaster } from '@/components/ui';
import { RootFrame } from '@/components/frame';
import './globals.css';

export const metadata: Metadata = {
  title: '와이디인더스트리',
  description:
    '㈜YD인더스트리는 대한민국을 대표하는 친환경 목재 가공 전문 기업입니다.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: '와이디인더스트리',
    description:
      '㈜YD인더스트리는 대한민국을 대표하는 친환경 목재 가공 전문 기업입니다.',
    images: [
      {
        url: '/assets/thumbnail.png',
        width: 800,
        height: 600,
        alt: '와이디인더스트리 thumbnail',
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
  keywords: [
    'YD인더스트리',
    '인천 인테리어',
    '친환경 목재',
    '목재 가공',
    '환경 친화적',
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <head>
        <meta
          name='naver-site-verification'
          content='583bee0fab250380e7beb8f97af1366ff3aa98c3'
        />
      </head>
      <body className='antialiased font-sans'>
        <RootFrame>{children}</RootFrame>
        <Toaster />
      </body>
    </html>
  );
}
