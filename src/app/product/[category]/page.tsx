'use client';

import { JSX, useEffect, useRef, useState } from 'react';
import { getProductList } from '@/app/api/product';
import { Banner, TabItem } from '@/components/common';
import { UrlTabs } from '@/components/common/UrlTabs';
import {
  LpmTab,
  MirrorLpmTab,
  PvcTab,
  AsaPetTab,
  HpmTab,
} from '@/components/product';
import { ProductCategory } from '@/types/sample';

const getProductTabs = (
  productData: ProductCategory[],
  onPageChange: () => void
): TabItem[] => {
  return productData
    .map((item) => {
      const componentFactory: Record<
        string,
        (info: ProductCategory) => JSX.Element
      > = {
        '1f5c9fb8-a04e-40cc-ab5d-2ed84f4aedd7': (info) => (
          <LpmTab lpm={info} onPageChange={onPageChange} />
        ),
        '4e1b32c0-c79c-4375-ac5f-afcda0c2f164': (info) => (
          <MirrorLpmTab mirrorLpm={info} onPageChange={onPageChange} />
        ),
        'ae6f5894-7de4-422e-bf0b-b7517ac23bd3': (info) => (
          <PvcTab pvc={info} onPageChange={onPageChange} />
        ),

        'f024def7-bde5-4205-94ed-77b02275e99d': (info) => (
          <AsaPetTab asa={info} onPageChange={onPageChange} />
        ),
        'f1fef9f6-5e31-444c-8f16-c743b8506a96': (info) => (
          <HpmTab hpm={info} onPageChange={onPageChange} />
        ),
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

const ProductPage = () => {
  const [productList, setProductList] = useState<ProductCategory[]>([]);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductList();
      setProductList(products);
    };
    fetchProducts();
  }, []);

  const handlePageChange = () => {
    tabsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const tabs: TabItem[] = getProductTabs(productList, handlePageChange).filter(
    (tab): tab is TabItem => tab !== null
  );

  return (
    <>
      <Banner
        title='제품소개'
        description='공간의 품격을 높여줄 고품질 표면재'
        imgUrl='/assets/product.png'
      />
      {productList.length > 0 && (
        <UrlTabs
          basePath='/product'
          defaultTab='lpm'
          tabs={tabs}
          ref={tabsRef}
        />
      )}
    </>
  );
};

export default ProductPage;
