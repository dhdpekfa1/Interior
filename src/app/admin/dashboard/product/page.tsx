'use client';

import React from 'react';
import Image from 'next/image';
import productData from '@/assets/mock/mockProduct.json';
import { Button } from '@/components/ui';
import { AdminProductDialog } from '@/components/admin';
import { SearchBar } from '@/components/common';

const AdminProductPage = () => {
  const decoProducts = productData.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    img: item.img,
    tags: item.tags,
  }));

  const onEditProduct = () => {};
  const onRemoveProduct = () => {};
  const addProduct = () => {};

  return (
    <div className='wrapper flex flex-col items-center justify-center'>
      <div className='flex items-center justify-between my-4 w-full'>
        <div>
          <AdminProductDialog
            onSubmit={addProduct}
            name={''}
            description={''}
            image={''}
          />
        </div>

        <SearchBar onSubmit={() => console.log('TODO: 검섹 이벤트')} />
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {decoProducts.map((product) => (
          <div
            key={product.id}
            className='group transition-transform duration-300 cursor-pointer border-point bg-white shadow-md relative'
          >
            {/* 이미지 */}
            <div className='relative w-full aspect-square overflow-hidden'>
              {product.img ? (
                <Image
                  src={product.img}
                  alt={product.name}
                  width={200}
                  height={300}
                  className='object-cover w-full h-full'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center bg-gray-300 animate-pulse'>
                  <p className='text-xs md:text-sm'>이미지 준비중</p>
                </div>
              )}
            </div>

            <p className='text-center text-two my-2 text-base'>
              {product.name}
            </p>

            {/* 호버 시 버튼 */}
            <div className='absolute top-0 left-0 w-full flex gap-1 py-2 px-1 bg-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden'>
              <AdminProductDialog
                onSubmit={onEditProduct}
                name={product.name}
                description={'TODO: 제품 설명 변경'}
                image={product.img}
                isEdit={true}
              />
              <Button
                className='bg-red-500/80 text-white hover:bg-red-500 flex-1 w-fit'
                onClick={onRemoveProduct}
              >
                삭제
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductPage;
