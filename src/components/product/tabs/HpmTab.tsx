import { getProductHpm } from '@/app/api/product';
import { SampleList } from '@/components/common';
import { ProductCategory } from '@/types/sample';
import React from 'react';

interface Props {
  hpm: ProductCategory;
}

export const HpmTab = async ({ hpm }: Props) => {
  const hpmProducts = await getProductHpm();

  if (!hpm || !hpmProducts) return '오류가 발생했습니다.';

  return (
    <SampleList
      title='HPM'
      mainImageUrl={hpm.main_image}
      subImageUrl={hpm.sub_image}
      thirdImageUrl={hpm.third_image}
      content={hpm.content}
      dataList={hpmProducts}
    />
  );
};
