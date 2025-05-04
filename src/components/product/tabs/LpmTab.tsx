import React from 'react';
import { SampleList } from '@/components/common';
import { getProductDeco } from '@/app/api/\bproduct';
import { ProductCategory } from '@/types/sample';

interface Props {
  lpm: ProductCategory;
}

export const LpmTab = async ({ lpm }: Props) => {
  // TODO: getProductLpm 으로 변경, 테이블명도 변경
  const decoProducts = await getProductDeco();

  if (!lpm || !decoProducts) return '오류가 발생했습니다.';

  return (
    <SampleList
      title='LPM'
      mainImageUrl={lpm.main_image}
      subImageUrl={lpm.sub_image}
      thirdImageUrl={lpm.third_image}
      content={lpm.content}
      dataList={decoProducts}
    />
  );
};
