import { AboutUsTab, DirectionsTab } from '@/components/about';
import { UrlTabs } from '@/components/common';

const ABOUT_TABS = [
  { label: '회사 소개', value: 'us', component: <AboutUsTab /> },
  { label: '오시는 길', value: 'directions', component: <DirectionsTab /> },
];

const AboutUsPage = () => {
  return (
    <div className='container'>
      <UrlTabs
        title='Company'
        basePath='/about'
        defaultTab='us'
        tabs={ABOUT_TABS}
      />
    </div>
  );
};

export default AboutUsPage;
