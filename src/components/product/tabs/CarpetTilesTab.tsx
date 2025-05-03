import { getProductCarpetTile } from '@/app/api/\bproduct';
import { SampleList } from '@/components/common';
import { ProductCategory } from '@/types/sample';
import React from 'react';

interface Props {
  carpetTile: ProductCategory;
}

export const CarpetTilesTab = async ({ carpetTile }: Props) => {
  const carpetTileProducts = await getProductCarpetTile();

  if (!carpetTile || !carpetTileProducts) return '오류가 발생했습니다.';

  return (
    <SampleList
      title='카펫타일'
      mainImageUrl={carpetTile.main_image}
      subImageUrl={carpetTile.sub_image}
      thirdImageUrl={carpetTile.third_image}
      content={carpetTile.content}
      dataList={carpetTileProducts}
    />
  );
};
