import { Banner, UrlTabs } from '@/components/common';
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
    <>
      <Banner
        title='제품소개'
        description='공간의 품격을 높여줄 고품질 타일'
        imgUrl='https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      />
      <UrlTabs basePath='/product' defaultTab='deco' tabs={PRODUCT_TABS} />
    </>
  );
};

export default ProductPage;
