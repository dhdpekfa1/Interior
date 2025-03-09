import React from 'react';
import { SampleList } from '@/components/common';
import productData from '@/assets/mock/mockProduct.json';

export const DecoTab = () => {
  // 형식 변환
  const decoProducts = productData.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    img: item.img,
    tags: item.tags,
  }));

  return (
    <SampleList
      title='데코타일'
      mainImgUrl='https://images.unsplash.com/photo-1711110175192-fbb074ae03d8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      subImgUrl='https://images.unsplash.com/photo-1625470496744-a01bf36a262f?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      content='폴리프로필렌은 분자구성이 안정적이며, 연소 및 분해시 유해가스의 발생이 없고, 강도 및 식품안정성이 우수하여 식품 포장재료로도 널리 사용 되는 소재 입니다.
또한 PVC등 타 표면소재를 가공할 때 필요로 하는 가소제(Phthalate)를 전혀 사용하지 않아 환경호르몬과 새집 증후군의 원인물질인휘발성 유기화합물(VOCs)의 발생을 사전에 차단하고 있습니다.'
      dataList={decoProducts}
    />
  );
};
