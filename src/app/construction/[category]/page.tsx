import { UrlTabs } from '@/components/common';
import {
  CarpetTab,
  CarpetTilesTab,
  DecoTab,
  DeluxeTab,
  SelfTab,
  WoodTab,
} from '@/components/construction';

const CONSTRUCTION_TABS = [
  { label: '데코타일', value: 'deco', component: <DecoTab /> },
  { label: '우드타일', value: 'wood', component: <WoodTab /> },
  { label: '카페트', value: 'carpet', component: <CarpetTab /> },
  { label: '카펫타일', value: 'carpet-tiles', component: <CarpetTilesTab /> },
  { label: '디럭스', value: 'deluxe', component: <DeluxeTab /> },
  { label: '수평몰탈', value: 'self', component: <SelfTab /> },
];

const ConstructionPage = () => {
  return (
    <div className='container'>
      <UrlTabs
        title='시공사례'
        basePath='/construction'
        defaultTab='deco'
        tabs={CONSTRUCTION_TABS}
      />
    </div>
  );
};

export default ConstructionPage;
