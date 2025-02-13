'use client';

import { useState } from 'react';
import { SubTabs, SubTabsList, SubTabsTrigger } from '@/components/ui';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
}

interface ProductTabsProps {
  title: string;
  categories: { label: string; value: string }[];
  products: Product[];
}

export const SampleList = ({
  // title,
  categories,
  products,
}: ProductTabsProps) => {
  const [selectedTab, setSelectedTab] = useState('all');

  // 선택된 카테고리에 따라 필터링
  const filteredProducts =
    selectedTab === 'all'
      ? products
      : products.filter((product) => product.category === selectedTab);

  return (
    <div className='container mx-auto p-4'>
      {/* 카테고리 탭 */}
      <SubTabs defaultValue='all' onValueChange={setSelectedTab}>
        <SubTabsList>
          {categories.map((category) => (
            <SubTabsTrigger key={category.value} value={category.value}>
              {category.label}
            </SubTabsTrigger>
          ))}
        </SubTabsList>
      </SubTabs>

      {/* 제품 리스트 */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
        {filteredProducts.map((product) => (
          <div key={product.id} className='border p-3 text-center'>
            <Image
              src={product.image}
              alt={product.name}
              className='w-full h-auto'
              width={200}
              height={200}
            />
            <p className='mt-2 font-bold'>{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
