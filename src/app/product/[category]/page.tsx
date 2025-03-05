import { UrlTabs } from '@/components/common';
import {
  CarpetTab,
  CarpetTilesTab,
  DecoTab,
  DeluxeTab,
  WoodTab,
} from '@/components/product';

const PRODUCT_TABS = [
  { label: '데코타일', value: 'deco', component: <DecoTab /> },
  { label: '우드타일', value: 'wood', component: <WoodTab /> },
  { label: '카페트', value: 'carpet', component: <CarpetTab /> },
  { label: '카펫타일', value: 'carpet-tiles', component: <CarpetTilesTab /> },
  { label: '디럭스스타일', value: 'deluxe', component: <DeluxeTab /> },
];

const ProductPage = () => {
  return (
    <div className='container'>
      <UrlTabs
        title='Product'
        basePath='/product'
        defaultTab='deco'
        tabs={PRODUCT_TABS}
      />
    </div>
  );
};

export default ProductPage;
