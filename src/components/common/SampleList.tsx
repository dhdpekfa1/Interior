'use client';

import { useState } from 'react';
import { SubTabs, SubTabsList, SubTabsTrigger } from '@/components/ui';
import Image from 'next/image';
import { SubTitle } from './SubTitle';

interface Product {
  id: number;
  name: string;
  category: string;
  img: string;
}

interface ProductTabsProps {
  title: string;
  categories: { label: string; value: string }[];
  products: Product[];
}

export const SampleList = ({
  title,
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
    <div className='wrapper'>
      <SubTitle title={title} />
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
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <div className='border border-dd p-1 text-center'>
              <div className='relative w-full aspect-square overflow-hidden'>
                <Image
                  // src={product.img} // TOD: 이미지 적용
                  src={
                    'https://images.unsplash.com/photo-1739361133037-77be66a4ea6a?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  }
                  alt={product.name}
                  className='object-fill scale-[4]'
                  width={200}
                  height={200}
                />
              </div>
            </div>
            <p className='mt-2 text-center text-dd text-sm sm:text-base font-bold'>
              {product.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
