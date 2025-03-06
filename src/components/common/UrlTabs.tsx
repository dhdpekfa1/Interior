'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';

export interface TabItem {
  label: string;
  value: string;
  component: React.ReactNode;
}

interface UrlTabsProps {
  title?: string; // TODO: 제거
  basePath: string; // ex) '/about , '/product'
  defaultTab: string; // ex) 'deco', 'carpet', 'wood'
  tabs: TabItem[];
}

export const UrlTabs = ({ basePath, defaultTab, tabs }: UrlTabsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // 현재 URL에서 마지막 경로 추출
  const currentTab = pathname.split('/').pop() || defaultTab;

  // 탭 변경 시 URL 업데이트
  const handleTabChange = (value: string) => {
    router.push(`${basePath}/${value}`, { scroll: false });
  };

  return (
    <Tabs defaultValue={currentTab} onValueChange={handleTabChange}>
      <TabsList className='w-full h-full bg-white'>
        <div className='flex flex-1'>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className='flex-1'>
              {tab.label}
            </TabsTrigger>
          ))}
        </div>
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className='container'>
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};
