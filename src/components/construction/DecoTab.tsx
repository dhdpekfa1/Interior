import React from 'react';
import { SampleList } from '@/components/common';
import constructionData from '@/assets/mock/mockConstruction.json';

const decoCategories = [
  { label: '전체', value: 'all' },
  { label: '대진데코타일', value: 'daejin' },
  { label: '동신데코타일', value: 'dongsin' },
  { label: '녹수데코타일', value: 'noksu' },
  { label: 'LG데코타일에코노', value: 'lg-econo' },
  { label: 'LG데코타일보타닉', value: 'lg-botanic' },
  { label: '현대 데코타일클래식', value: 'hyundai-classic' },
  { label: '현대데코타일마스터', value: 'hyundai-master' },
  { label: '재영데코타일', value: 'jaeyoung' },
  { label: '수원 스크린 골프장', value: 'suwon-screen-golf' },
];

export const DecoTab = () => {
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
      products={decoConstruction}
    />
  );
};
