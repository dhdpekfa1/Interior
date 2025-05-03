import { getProductWood } from '@/app/api/\bproduct';
import { SampleList } from '@/components/common';
import { ProductCategory } from '@/types/sample';
import React from 'react';

interface Props {
  wood: ProductCategory;
}

export const WoodTab = async ({ wood }: Props) => {
  const woodProducts = await getProductWood();

  if (!wood || !woodProducts) return '오류가 발생했습니다.';

  console.log('woodProducts', woodProducts);

  return (
    <SampleList
      title='우드타일'
      mainImageUrl={wood.main_image}
      subImageUrl={wood.sub_image}
      thirdImageUrl={wood.third_image}
      content={wood.content}
      dataList={woodProducts}
    />
  );
};
