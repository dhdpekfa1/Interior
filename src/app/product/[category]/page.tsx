import { JSX } from 'react';
import { getProductList } from '@/app/api/product';
import { Banner, TabItem, UrlTabs } from '@/components/common';
import {
  LpmTab,
  MirrorLpmTab,
  PvcTab,
  AsaPetTab,
  HpmTab,
} from '@/components/product';
import { ProductCategory } from '@/types/sample';

const getProductTabs = (productData: ProductCategory[]): TabItem[] => {
  return productData
    .map((item) => {
      const componentFactory: Record<
        string,
        (info: ProductCategory) => JSX.Element
      > = {
        '1f5c9fb8-a04e-40cc-ab5d-2ed84f4aedd7': (info) => <LpmTab lpm={info} />,
        '4e1b32c0-c79c-4375-ac5f-afcda0c2f164': (info) => (
          <MirrorLpmTab mirrorLpm={info} />
        ),
        'ae6f5894-7de4-422e-bf0b-b7517ac23bd3': (info) => <PvcTab pvc={info} />,

        'f024def7-bde5-4205-94ed-77b02275e99d': (info) => (
          <AsaPetTab asa={info} />
        ),
        'f1fef9f6-5e31-444c-8f16-c743b8506a96': (info) => <HpmTab hpm={info} />,
      };

      const factory = componentFactory[item.id];
      if (!factory) return null;

      return {
        label: item.label,
        value: item.category,
        component: factory(item),
      };
    })
    .filter((tab): tab is TabItem => tab !== null);
};

const ProductPage = async () => {
  const productList = await getProductList();

  const tabs: TabItem[] = getProductTabs(productList).filter(
    (tab): tab is TabItem => tab !== null
  );

  return (
    <>
      <Banner
        title='제품소개'
        description='공간의 품격을 높여줄 고품질 타일'
        imgUrl='https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      />
      <UrlTabs basePath='/product' defaultTab='lpm' tabs={tabs} />
    </>
  );
};

export default ProductPage;
