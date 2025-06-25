'use client';

import React, { useEffect, useState } from 'react';
import { SampleList } from '@/components/common';
import { getProductLpm } from '@/app/api/product';
import { Product, ProductCategory } from '@/types/sample';

interface Props {
  lpm: ProductCategory;
  onPageChange: () => void;
}

export const LpmTab = ({ lpm, onPageChange }: Props) => {
  const [lpmProducts, setLpmProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLpmProducts = async () => {
      try {
        const products = await getProductLpm();
        if (!lpm || !products) {
          setError('데이터를 불러오는 데 실패했습니다.');
        } else {
          setLpmProducts(products);
        }
      } catch (err) {
        console.error(err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchLpmProducts();
  }, [lpm]);

  if (error) return <div>{error}</div>;

  return (
    <SampleList
      title='LPM'
      dataList={lpmProducts}
      onPageChange={onPageChange}
    />
  );
};
