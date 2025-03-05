'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SubTitle, Pagination } from '@/components/common';
import { useProductStore } from '@/store/useProductStore';
import { InquiryDialog, ProductCounter } from '@/components/product';
import { Check, Asterisk } from 'lucide-react';

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

const ITEMS_PER_PAGE = 15; // 페이지당 아이템 수

export const SampleList = ({
  title,
  imgUrl,
  dataList,
  content,
}: SampleListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { addProduct, removeProduct, selectedProducts } = useProductStore();

  const handleSelectProduct = (product: Data) => {
    const isSelected = selectedProducts.some(
      (item) => item.id === product.id.toString()
    );

    if (isSelected) {
      removeProduct(product.id.toString());
    } else {
      addProduct({
        id: product.id.toString(),
        name: product.name,
        count: 1,
      });
    }
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
        <p className='text-xs sm:text-sm md:text-base lg:text-xl text-two break-keep lg:pb-8'>
          {content}
        </p>
      </div>

      <div className='flex item-center justify-center text-[10px] sm:xs md:text-sm text-two/70'>
        <Asterisk className='h-auto w-2 md:w-3' />
        <span>
          원하시는 제품을 선택한 후, 문의하기 버튼을 통해 상담을 진행해 주세요.
        </span>
      </div>

      {/* 제품 리스트 */}
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4'>
        {paginatedProducts.map((product) => {
          const isSelected = selectedProducts.some(
            (item) => item.id === product.id.toString()
          );

          return (
            <div
              key={product.id}
              className={`group transition-transform duration-300 cursor-pointer ${
                isSelected
                  ? 'border-point bg-second/10 shadow-md'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div onClick={() => handleSelectProduct(product)}>
                <div className='relative w-full aspect-square overflow-hidden'>
                  {product.img ? (
                    <Image
                      src={product.img}
                      alt={product.name}
                      fill
                      sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw'
                      className='duration-300 hover:scale-125 object-cover'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center bg-gray-300 animate-pulse'>
                      <p className='text-xs md:text-sm'>이미지 준비중</p>
                    </div>
                  )}

                  {isSelected && (
                    <Check
                      className='absolute top-2 right-2 text-point bg-white'
                      size={24}
                    />
                  )}
                </div>
                <p className='mt-2 text-center text-two text-xs sm:text-sm md:text-base'>
                  {product.name}
                </p>
              </div>

              {/* 선택된 상품: 카운터 표시 */}
              {isSelected && (
                <div className='mt-2 flex justify-center pb-2'>
                  <ProductCounter
                    id={product.id.toString()}
                    count={
                      selectedProducts.find(
                        (item) => item.id === product.id.toString()
                      )?.count || 1
                    }
                    showRemoveButton={false}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 문의접수 버튼 */}
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
