import { getProductCarpet } from '@/app/api/\bproduct';
import { SampleList } from '@/components/common';
import { ProductCategory } from '@/types/sample';
import React from 'react';

interface Props {
  carpet: ProductCategory;
}

export const CarpetTab = async ({ carpet }: Props) => {
  const carpetProducts = await getProductCarpet();

  if (!carpet || !carpetProducts) return '오류가 발생했습니다.';

  return (
    <SampleList
      title='카페트'
      mainImageUrl={carpet.main_image}
      subImageUrl={carpet.sub_image}
      thirdImageUrl={carpet.third_image}
      content={carpet.content}
      dataList={carpetProducts}
    />
  );
};
