'use client';

import React, { useEffect, useState } from 'react';
import { SampleList } from '@/components/common';
import { getProductPvc } from '@/app/api/product';
import { Product, ProductCategory } from '@/types/sample';

interface Props {
  pvc: ProductCategory;
  onPageChange: () => void;
}

export const PvcTab = ({ pvc, onPageChange }: Props) => {
  const [pvcProducts, setPvcProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPvcProducts = async () => {
      try {
        const products = await getProductPvc();
        if (!pvc || !products) {
          setError('데이터를 불러오는 데 실패했습니다.');
        } else {
          setPvcProducts(products);
        }
      } catch (err) {
        console.error(err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchPvcProducts();
  }, [pvc]);

  if (error) return <div>{error}</div>;

  return (
    <SampleList
      title='PVC/PP'
      dataList={pvcProducts}
      onPageChange={onPageChange}
    />
  );
};
