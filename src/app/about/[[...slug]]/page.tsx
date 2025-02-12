import React from 'react';
import { AboutUsTab, DirectionsTab } from '@/components/about';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';

const AboutUsPage = () => {
  return (
    <div className='container'>
      <Tabs defaultValue='about'>
        <TabsList>
          <TabsTrigger value='about'>회사 소개</TabsTrigger>
          <TabsTrigger value='directions'>찾아오기</TabsTrigger>
        </TabsList>
        <TabsContent value='about'>
          <AboutUsTab />
        </TabsContent>
        <TabsContent value='directions'>
          <DirectionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AboutUsPage;
