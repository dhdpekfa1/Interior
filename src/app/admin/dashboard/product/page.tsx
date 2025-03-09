'use client';

import React from 'react';
import Image from 'next/image';
import productData from '@/assets/mock/mockProduct.json';
import { Button } from '@/components/ui';

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

  return (
    <div className='wrapper flex items-center justify-center'>
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
            <div className='absolute bottom-0 left-0 right-0 flex justify-center bg-white/70 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <Button
                className='mr-2 bg-point/90 hover:bg-point border-point'
                onClick={onEditProduct}
              >
                수정
              </Button>
              <Button
                className='bg-red-500/80 text-white border hover:bg-red-500'
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
