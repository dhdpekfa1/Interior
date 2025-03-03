'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SubTitle, Pagination } from '@/components/common';
import { useProductStore } from '@/store/useProductStore';
import { InquiryDialog } from '../product';

interface Data {
  id: number;
  name: string;
  img?: string;
}

interface SampleListProps {
  title: string;
  imgUrl: string;
  content: string;
  dataList: Data[];
}

const ITEMS_PER_PAGE = 20; // 페이지당 아이템 수

export const SampleList = ({
  title,
  imgUrl,
  dataList,
  content,
}: SampleListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { addProduct, selectedProducts } = useProductStore();

  const handleSelectProduct = (product: Data) => {
    addProduct({
      id: product.id.toString(),
      name: product.name,
      count: 1,
    });
  };

  // 페이지네이션 적용
  const totalItems = dataList.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = dataList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className='wrapper'>
      <SubTitle title={title} />

      {/* 제품 설명 */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 items-center lg:items-end mb-10'>
        <Image
          src={imgUrl}
          alt={`${title} 소개`}
          width={200}
          height={300}
          className='w-full h-full'
        />
        <p className='text-xs sm:text-sm md:text-base lg:text-xl text-white break-keep lg:pb-8'>
          {content}
        </p>
      </div>

      {/* 제품 리스트 */}
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4'>
        {paginatedProducts.map((product) => {
          const isSelected = selectedProducts.some(
            (item) => item.id === product.id.toString()
          );

          return (
            <div
              onClick={() => handleSelectProduct(product)}
              key={product.id}
              className={`group transition-transform duration-300 ${
                isSelected ? 'border-2 border-point' : ''
              }`}
            >
              <div>
                <div className='relative w-full aspect-square overflow-hidden'>
                  <Image
                    src={product.img || ''}
                    alt={product.name}
                    fill
                    className='hover:scale-110 duration-300'
                  />
                </div>
                <p className='mt-2 text-center text-dd text-xs sm:text-sm md:text-base'>
                  {product.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 문의하기 버튼 */}
      <div className='mt-10 flex justify-center'>
        <InquiryDialog />
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
