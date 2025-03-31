'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { SubTitle, Pagination } from '@/components/common';
import { useProductStore } from '@/store/useProductStore';
import { InquiryDialog, ProductCounter } from '@/components/product';
import { Check, Asterisk } from 'lucide-react';
import { Separator } from '@/components/ui';

interface Data {
  id: number;
  name: string;
  img?: string;
  description: string;
}

interface SampleListProps {
  title: string;
  mainImgUrl: string;
  subImgUrl: string;
  content: string;
  dataList: Data[];
}

const ITEMS_PER_PAGE = 15; // 페이지당 아이템 수

export const SampleList = ({
  title,
  mainImgUrl,
  subImgUrl,
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
      {/* <div className='grid grid-cols-1 sm:grid-cols-2 items-start h-[20rem] gap-6'> */}
      <div className='flex flex-col sm:flex-row items-start h-[40rem] gap-6'>
        {/* 메인 이미지 */}
        <div className='relative w-full h-full flex-1'>
          <Image
            src={mainImgUrl}
            alt={`${title} 소개 이미지 1`}
            fill
            className='object-cover'
          />
        </div>

        {/* 서브 이미지 + 텍스트 */}
        <div className='flex flex-col gap-6 lg:gap-12 justify-end h-full flex-1'>
          <div className='relative w-full h-full'>
            <Image
              src={subImgUrl}
              alt={`${title} 소개 이미지 2`}
              fill
              className='object-cover'
            />
          </div>
          <p className='text-xs sm:text-sm md:text-base lg:text-xl text-two break-keep'>
            {content}
          </p>

          <div className='relative w-full h-full'>
            <Image
              src='https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt={`${title} 소개 이미지 3`}
              fill
              className='object-cover'
            />
          </div>
        </div>
      </div>

      <Separator className='my-4 sm:my-6' />
      <div className='flex item-center justify-center text-[10px] sm:xs md:text-sm text-two/70 mb-4'>
        <Asterisk className='h-auto w-2 md:w-3' />
        <span className='break-keep'>
          하단에서 원하시는 제품을 선택한 후, 문의하기 버튼을 통해 상담을 진행해
          주세요.
        </span>
      </div>
      {/* 제품 리스트 */}
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {paginatedProducts.map((product) => {
          const isSelected = selectedProducts.some(
            (item) => item.id === product.id.toString()
          );

          return (
            <div
              key={product.id}
              className='group transition-transform duration-300 cursor-pointer border-point bg-white shadow-md'
            >
              <div
                onClick={() => handleSelectProduct(product)}
                className='flex flex-col gap-4'
              >
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

                  <Check
                    className={cn(
                      'absolute top-2 right-2 text-point bg-white',
                      'transition-all duration-300',
                      isSelected
                        ? 'opacity-100 visible scale-100'
                        : 'opacity-0 invisible scale-95'
                    )}
                    size={24}
                  />
                </div>
                <p className='mt-2 text-center text-two text-xs sm:text-sm md:text-base'>
                  {product.name}
                </p>

                {/* 태그 */}
                <div className='flex items-center justify-around'>
                  <p className='text-two/60 text-xs sm:text-sm'>
                    {product.description}
                  </p>
                </div>
              </div>
              {/* 선택된 상품: 카운터 표시 */}
              <div
                className={cn(
                  'flex justify-center pb-2 transition-all duration-300',
                  isSelected
                    ? 'opacity-100 visible scale-100 mt-5'
                    : 'opacity-0 invisible scale-95'
                )}
              >
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
