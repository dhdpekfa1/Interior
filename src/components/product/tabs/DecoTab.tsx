import React from 'react';
import { SampleList } from '@/components/common';
import { getProductDeco, getProductList } from '@/app/api/\bproduct';

export const DecoTab = async () => {
  const decoProducts = await getProductDeco();
  const productCategory = await getProductList();

  const deco = productCategory.find(
    (product) => product.id === '1f5c9fb8-a04e-40cc-ab5d-2ed84f4aedd7'
  );

  if (!deco) return '오류가 발생했습니다.';

  return (
    <SampleList
      title='데코타일'
      mainImageUrl={deco.main_image}
      subImageUrl={deco.sub_image}
      thirdImageUrl={deco.third_image}
      content={deco.content}
      dataList={decoProducts}
    />
  );
};
