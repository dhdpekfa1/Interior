import React from 'react';
import { SampleList } from '@/components/common';
import { getProductLpm } from '@/app/api/product';
import { ProductCategory } from '@/types/sample';

interface Props {
  lpm: ProductCategory;
}

export const LpmTab = async ({ lpm }: Props) => {
  const lpmProducts = await getProductLpm();

  if (!lpm || !lpmProducts) return '오류가 발생했습니다.';

  return <SampleList title='LPM' dataList={lpmProducts} />;
};
