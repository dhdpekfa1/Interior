import { getProductMirrorLpm } from '@/app/api/\bproduct';
import { SampleList } from '@/components/common';
import { ProductCategory } from '@/types/sample';
import React from 'react';

interface Props {
  mirrorLpm: ProductCategory;
}

export const MirrorLpmTab = async ({ mirrorLpm }: Props) => {
  const mirrorLpmProducts = await getProductMirrorLpm();

  if (!mirrorLpm || !mirrorLpmProducts) return '오류가 발생했습니다.';

  return (
    <SampleList
      title='경면 LPM'
      mainImageUrl={mirrorLpm.main_image}
      subImageUrl={mirrorLpm.sub_image}
      thirdImageUrl={mirrorLpm.third_image}
      content={mirrorLpm.content}
      dataList={mirrorLpmProducts}
    />
  );
};
