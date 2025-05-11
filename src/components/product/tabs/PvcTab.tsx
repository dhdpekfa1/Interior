import React from 'react';
import { getProductPvc } from '@/app/api/product';
import { SampleList } from '@/components/common';
import { ProductCategory } from '@/types/sample';

interface Props {
  pvc: ProductCategory;
}

export const PvcTab = async ({ pvc }: Props) => {
  const pvcProducts = await getProductPvc();

  if (!pvcProducts || !pvc) return '오류가 발생했습니다.';

  return <SampleList title='PVC/PP' dataList={pvcProducts} />;
};
