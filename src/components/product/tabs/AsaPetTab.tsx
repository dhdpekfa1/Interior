import { getProductAsa } from '@/app/api/product';
import { SampleList } from '@/components/common';
import { ProductCategory } from '@/types/sample';
import React from 'react';

interface Props {
  asa: ProductCategory;
}

export const AsaPetTab = async ({ asa }: Props) => {
  const asaProducts = await getProductAsa();

  if (!asa || !asaProducts) return '오류가 발생했습니다.';

  return <SampleList title='ASA/PET' dataList={asaProducts} />;
};
