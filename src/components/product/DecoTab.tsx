import React from 'react';
import { SampleList } from '@/components/common';
import ProductData from '@/assets/mock/mockProduct.json';
import categories from '@/assets/categories.json';

export const DecoTab = () => {
  // deco 탭 카테고리
  const decoCategories = categories.deco;

  // 형식 변환
  const decoProducts = ProductData.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    img: item.img,
  }));

  return (
    <SampleList
      title='데코타일'
      categories={decoCategories}
      dataList={decoProducts}
    />
  );
};
