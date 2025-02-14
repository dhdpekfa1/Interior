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
  { label: '수원 스크린 골프장', value: 'suwon-screen-golf' },
];

const decoConstruction = [
  {
    id: 1,
    name: '김포주택',
    category: 'jaeyoung',
    img: '/imgs/construction/gimpo_house.jpg',
  },
  {
    id: 2,
    name: '서울 치과',
    category: 'jaeyoung',
    img: '/imgs/construction/seoul_dental.jpg',
  },
  {
    id: 3,
    name: '수원 스크린 골프장',
    category: 'suwon-screen-golf',
    img: '/imgs/construction/suwon_golf.jpg',
  },
  {
    id: 4,
    name: '이천 한방병원',
    category: 'daejin',
    img: '/imgs/construction/icheon_hospital.jpg',
  },
  {
    id: 5,
    name: '성남 우리빌 아파트 엘리베이터',
    category: 'daejin',
    img: '/imgs/construction/seongnam_apt_elevator.jpg',
  },
  {
    id: 6,
    name: '송파구 동화빌딩',
    category: 'dongsin',
    img: '/imgs/construction/songpa_building.jpg',
  },
  {
    id: 7,
    name: '수원 아파트',
    category: 'dongsin',
    img: '/imgs/construction/suwon_apt.jpg',
  },
  {
    id: 8,
    name: '김포 아파트',
    category: 'dongsin',
    img: '/imgs/construction/gimpo_apt.jpg',
  },
];

export const DecoTab = () => {
  return (
    <SampleList
      title='데코타일'
      categories={decoCategories}
      products={decoConstruction}
    />
  );
};
