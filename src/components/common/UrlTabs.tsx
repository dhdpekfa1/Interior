'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';

export interface TabItem {
  label: string;
  value: string;
  component: React.ReactNode;
}

interface UrlTabsProps {
  title: string;
  basePath: string; // ex) '/about , '/product'
  defaultTab: string; // ex) 'deco', 'carpet', 'wood'
  tabs: TabItem[];
}

export const UrlTabs = ({
  title,
  basePath,
  defaultTab,
  tabs,
}: UrlTabsProps) => {
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
      <TabsList title={title}>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};
