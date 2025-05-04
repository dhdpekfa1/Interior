import React from 'react';
import { getProductDeluxe } from '@/app/api/\bproduct';
import { SampleList } from '@/components/common';
import { ProductCategory } from '@/types/sample';

interface Props {
  pvc: ProductCategory;
}

export const PvcTab = async ({ pvc }: Props) => {
  const pvcProducts = await getProductDeluxe();

  if (!pvcProducts || !pvc) return '오류가 발생했습니다.';

  return (
    <SampleList
      title='PVC/PP'
      mainImageUrl={pvc.main_image}
      subImageUrl={pvc.sub_image}
      thirdImageUrl={pvc.third_image}
      content={pvc.content}
      dataList={pvcProducts}
    />
  );
};
