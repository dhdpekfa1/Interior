import React from 'react';
import { SampleList } from '@/components/common';
import { getProductDeco } from '@/app/api/\bproduct';
import { ProductCategory } from '@/types/sample';

interface Props {
  deco: ProductCategory;
}

export const DecoTab = async ({ deco }: Props) => {
  const decoProducts = await getProductDeco();

  if (!deco || !decoProducts) return '오류가 발생했습니다.';

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
