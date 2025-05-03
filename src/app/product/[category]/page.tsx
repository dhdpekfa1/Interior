import { JSX } from 'react';
import { getProductList } from '@/app/api/\bproduct';
import { Banner, TabItem, UrlTabs } from '@/components/common';
import {
  CarpetTab,
  CarpetTilesTab,
  DecoTab,
  DeluxeTab,
  WoodTab,
} from '@/components/product';
import { ProductCategory } from '@/types/sample';

const componentMap: Record<string, JSX.Element> = {
  deco: <DecoTab />,
  wood: <WoodTab />,
  carpet: <CarpetTab />,
  carpet_tile: <CarpetTilesTab />,
  deluxe: <DeluxeTab />,
};

export const getProductTabs = (productData: ProductCategory[]) => {
  return productData
    .map((item) => {
      const component = componentMap[item.category];
      if (!component) return null;

      return {
        label: item.label,
        value: item.category,
        component,
      };
    })
    .filter(Boolean);
};

const ProductPage = async () => {
  const productTab = await getProductList();

  const tabs: TabItem[] = getProductTabs(productTab).filter(
    (tab): tab is TabItem => tab !== null
  );

  return (
    <>
      <Banner
        title='제품소개'
        description='공간의 품격을 높여줄 고품질 타일'
        imgUrl='https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      />
      <UrlTabs basePath='/product' defaultTab='deco' tabs={tabs} />
    </>
  );
};

export default ProductPage;
