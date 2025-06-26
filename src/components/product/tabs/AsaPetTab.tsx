'use client';

import React, { useEffect, useState } from 'react';
import { SampleList } from '@/components/common';
import { getProductAsa } from '@/app/api/product';
import { Product, ProductCategory } from '@/types/sample';

interface Props {
  asa: ProductCategory;
  onPageChange: () => void;
}

export const AsaPetTab = ({ asa, onPageChange }: Props) => {
  const [asaProducts, setAsaProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAsaProducts = async () => {
      try {
        const products = await getProductAsa();
        if (!asa || !products) {
          setError('데이터를 불러오는 데 실패했습니다.');
        } else {
          setAsaProducts(products);
        }
      } catch (err) {
        console.error(err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchAsaProducts();
  }, [asa]);

  if (error) return <div>{error}</div>;

  return (
    <SampleList
      title='ASA/PET'
      dataList={asaProducts}
      onPageChange={onPageChange}
    />
  );
};
