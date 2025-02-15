'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { SubTabs, SubTabsList, SubTabsTrigger } from '@/components/ui';
import { SubTitle, SearchBar } from '@/components/common';

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
  const router = useRouter();
  const pathname = usePathname();

  // 선택된 카테고리에 따라 필터링
  const filteredProducts =
    selectedTab === 'all'
      ? products
      : products.filter((product) => product.category === selectedTab);

  // 검색 핸들러
  const handleSearch = (query: string) => {
    console.log('검색어:', query);
  };

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
      <div className='flex items-center justify-end mt-5 md:mt-7 mb-4'>
        <SearchBar onSubmit={handleSearch} />
      </div>
      {/* 제품 리스트 */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
        {filteredProducts.map((product) => (
          <div
            onClick={() => router.push(`${pathname}/${product.id}`)}
            key={product.id}
            className='group transition-transform duration-300 hover:scale-105'
          >
            <div className='border border-dd/50 p-1 text-center'>
              <div className='relative w-full aspect-square overflow-hidden'>
                <Image
                  // src={product.img} // TOD: 이미지 적용
                  src={
                    'https://images.unsplash.com/photo-1739361133037-77be66a4ea6a?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  }
                  alt={product.name}
                  fill
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
