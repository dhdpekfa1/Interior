import React from 'react';
import { SampleList } from '@/components/common';

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
];

const decoProducts = [
  {
    id: 1,
    name: 'MTS 4421',
    category: 'daejin',
    img: '/imgs/mts_4421.png',
  },
  {
    id: 2,
    name: 'MTS 4422',
    category: 'daejin',
    img: '/imgs/mts_4422.png',
  },
  {
    id: 3,
    name: 'MTS 4425',
    category: 'dongsin',
    img: '/imgs/mts_4425.png',
  },
  {
    id: 4,
    name: 'MTS 4430',
    category: 'lg-botanic',
    img: '/imgs/mts_4430.png',
  },
  {
    id: 5,
    name: 'MTS 4435',
    category: 'lg-econo',
    img: '/imgs/mts_4435.png',
  },
];

export const DecoTab = () => {
  return (
    <SampleList
      title='데코타일'
      categories={decoCategories}
      products={decoProducts}
    />
  );
};
