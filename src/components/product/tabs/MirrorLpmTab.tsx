'use client';

import React, { useEffect, useState } from 'react';
import { SampleList } from '@/components/common';
import { getProductMirrorLpm } from '@/app/api/product';
import { Product, ProductCategory } from '@/types/sample';

interface Props {
  mirrorLpm: ProductCategory;
  onPageChange: () => void;
}

export const MirrorLpmTab = ({ mirrorLpm, onPageChange }: Props) => {
  const [mirrorLpmProducts, setMirrorLpmProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMirrorLpmProducts = async () => {
      try {
        const products = await getProductMirrorLpm();
        if (!mirrorLpm || !products) {
          setError('데이터를 불러오는 데 실패했습니다.');
        } else {
          setMirrorLpmProducts(products);
        }
      } catch (err) {
        console.error(err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchMirrorLpmProducts();
  }, [mirrorLpm]);

  if (error) return <div>{error}</div>;

  return (
    <SampleList
      title='경면 LPM'
      dataList={mirrorLpmProducts}
      onPageChange={onPageChange}
    />
  );
};
