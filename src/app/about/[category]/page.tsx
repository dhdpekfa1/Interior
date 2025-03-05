import { AboutUsTab, DirectionsTab } from '@/components/about';
import { Banner, UrlTabs } from '@/components/common';

const ABOUT_TABS = [
  { label: '회사 소개', value: 'us', component: <AboutUsTab /> },
  { label: '오시는 길', value: 'directions', component: <DirectionsTab /> },
];

const AboutUsPage = () => {
  return (
    <>
      <Banner
        title='Company'
        description='신뢰를 바탕으로 더 나은 내일을 만드는 회사'
        imgUrl='https://images.unsplash.com/photo-1611923973164-e0e5f7f69872?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      />
      <div className='container'>
        <UrlTabs
          title='Company'
          basePath='/about'
          defaultTab='us'
          tabs={ABOUT_TABS}
        />
      </div>
    </>
  );
};

export default AboutUsPage;
