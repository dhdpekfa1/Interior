'use client';

import { PageTransition } from '@/components/loading';

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageTransition>{children}</PageTransition>;
}
