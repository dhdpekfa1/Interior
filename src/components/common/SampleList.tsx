'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { SubTabs, SubTabsList, SubTabsTrigger } from '@/components/ui';
import { SubTitle, SearchBar, Pagination } from '@/components/common';

interface Data {
  id: number;
  name: string;
  category: string;
  img?: string;
}

interface SampleListProps {
  title: string;
  categories: { label: string; value: string }[];
  dataList: Data[];
}

const ITEMS_PER_PAGE = 20; // 페이지당 아이템 수

export const SampleList = ({
  title,
  categories,
  dataList,
}: SampleListProps) => {
  const [selectedTab, setSelectedTab] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const pathname = usePathname();

  // 선택된 카테고리에 따라 데이터 필터링
  const filteredProducts =
    selectedTab === '전체'
      ? dataList
      : dataList.filter((data) => data.category === selectedTab);

  // 페이지네이션 적용: 현재 페이지의 데이터만 보여줌
  const totalItems = filteredProducts.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // 검색 핸들러
  const handleSearch = (query: string) => {
    console.log('검색어:', query);
  };

  return (
    <div className='wrapper'>
      <SubTitle title={title} />

      {/* 카테고리 탭 */}
      <SubTabs
        defaultValue='all'
        onValueChange={(value) => {
          const selectedLabel =
            categories.find((c) => c.value === value)?.label || '전체';
          setSelectedTab(selectedLabel);
          setCurrentPage(1); // 카테고리 변경 시 1페이지로 리셋
        }}
      >
        <SubTabsList>
          {categories.map((category) => (
            <SubTabsTrigger key={category.value} value={category.value}>
              {category.label}
            </SubTabsTrigger>
          ))}
        </SubTabsList>
      </SubTabs>

      {/* 검색창 */}
      <div className='flex items-center justify-end mt-5 md:mt-7 mb-4'>
        <SearchBar onSubmit={handleSearch} />
      </div>

      {/* 제품 리스트 */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
        {paginatedProducts.map((product) => (
          <div
            onClick={() => router.push(`${pathname}/${product.id}`)}
            key={product.id}
            className='group transition-transform duration-300 hover:scale-105'
          >
            <div className='border border-dd/50 p-1 text-center'>
              <div className='relative w-full aspect-square overflow-hidden'>
                <Image src={product.img || ''} alt={product.name} fill />
              </div>
            </div>
            <p className='mt-2 text-center text-dd text-sm sm:text-base font-bold'>
              {product.name}
            </p>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalItems > ITEMS_PER_PAGE && (
        <div className='mt-6'>
          <Pagination
            currentPage={currentPage}
            total={totalItems}
            limit={ITEMS_PER_PAGE}
            showPages={5}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};
