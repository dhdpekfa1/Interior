'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { JSX, forwardRef } from 'react';

export interface TabItem {
  label: string;
  value: string;
  component: JSX.Element;
}

interface UrlTabsProps {
  basePath: string; // ex) '/about , '/product'
  defaultTab: string; // ex) 'deco', 'carpet', 'wood'
  tabs: TabItem[];
}

export const UrlTabs = forwardRef<HTMLDivElement, UrlTabsProps>(
  ({ basePath, defaultTab, tabs }, ref) => {
    const router = useRouter();
    const pathname = usePathname();
    const currentTab = pathname.split('/').pop() || defaultTab;

    const handleTabChange = (value: string) => {
      router.push(`${basePath}/${value}`, { scroll: false });
    };

    const showTabs = tabs.length >= 2;
    const activeTab = tabs.find((tab) => tab.value === currentTab) ?? tabs[0];

    return (
      <Tabs defaultValue={currentTab} onValueChange={handleTabChange} ref={ref}>
        {showTabs && (
          <TabsList className='w-full h-full bg-white'>
            <div className='flex flex-1'>
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className='flex-1'
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
        )}

        {showTabs
          ? tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className='container'
              >
                {tab.component}
              </TabsContent>
            ))
          : activeTab && <div className='container'>{activeTab.component}</div>}
      </Tabs>
    );
  }
);

UrlTabs.displayName = 'UrlTabs';
