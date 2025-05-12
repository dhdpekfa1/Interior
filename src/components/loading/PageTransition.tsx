'use client';

import { useEffect, useState } from 'react';
import { PageLoader } from './PageLoader';

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); // 1.5초 로딩
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <PageLoader />;

  return <>{children}</>;
};
