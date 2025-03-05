import React from 'react';
import { SampleList } from '@/components/common';
import ProductData from '@/assets/mock/mockProduct.json';

export const DecoTab = () => {
  // 형식 변환
  const decoProducts = ProductData.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    img: item.img,
    tags: item.tags,
  }));

  return (
    <SampleList
      title='데코타일'
      imgUrl='https://images.unsplash.com/photo-1529854140025-25995121f16f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29udGVudHxlbnwwfHwwfHx8MA%3D%3D'
      content='폴리프로필렌은 분자구성이 안정적이며, 연소 및 분해시 유해가스의 발생이 없고, 강도 및 식품안정성이 우수하여 식품 포장재료로도 널리 사용 되는 소재 입니다.
또한 PVC등 타 표면소재를 가공할 때 필요로 하는 가소제(Phthalate)를 전혀 사용하지 않아 환경호르몬과 새집 증후군의 원인물질인휘발성 유기화합물(VOCs)의 발생을 사전에 차단하고 있습니다.'
      dataList={decoProducts}
    />
  );
};
