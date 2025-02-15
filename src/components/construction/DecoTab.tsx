import React from 'react';
import { SampleList } from '@/components/common';
import constructionData from '@/assets/mock/mockConstruction.json';
import categories from '@/assets/categories.json';

export const DecoTab = () => {
  // deco 탭 카테고리
  const decoCategories = categories.deco;

  // 형식 변환
  const decoConstruction = constructionData.map((item) => ({
    id: item.id,
    name: item.location,
    category: item.category,
    img: item.images[0],
  }));

  return (
    <SampleList
      title='데코타일'
      categories={decoCategories}
      dataList={decoConstruction}
    />
  );
};
