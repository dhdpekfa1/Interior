'use client';

import React, { useEffect, useState } from 'react';
import { SampleList } from '@/components/common';
import { getProductHpm } from '@/app/api/product';
import { Product, ProductCategory } from '@/types/sample';

interface Props {
  hpm: ProductCategory;
  onPageChange: () => void;
}

export const HpmTab = ({ hpm, onPageChange }: Props) => {
  const [hpmProducts, setHpmProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHpmProducts = async () => {
      try {
        const products = await getProductHpm();
        if (!hpm || !products) {
          setError('데이터를 불러오는 데 실패했습니다.');
        } else {
          setHpmProducts(products);
        }
      } catch (err) {
        console.error(err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchHpmProducts();
  }, [hpm]);

  if (error) return <div>{error}</div>;

  return (
    <SampleList
      title='HPM'
      dataList={hpmProducts}
      onPageChange={onPageChange}
    />
  );
};
