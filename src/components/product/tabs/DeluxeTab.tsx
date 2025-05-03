import React from 'react';
import { getProductDeluxe } from '@/app/api/\bproduct';
import { SampleList } from '@/components/common';
import { ProductCategory } from '@/types/sample';

interface Props {
  deluxe: ProductCategory;
}

export const DeluxeTab = async ({ deluxe }: Props) => {
  const deluxeProducts = await getProductDeluxe();

  if (!deluxeProducts || !deluxe) return '오류가 발생했습니다.';

  return (
    <SampleList
      title='디럭스타일'
      mainImageUrl={deluxe.main_image}
      subImageUrl={deluxe.sub_image}
      thirdImageUrl={deluxe.third_image}
      content={deluxe.content}
      dataList={deluxeProducts}
    />
  );
};
