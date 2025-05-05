'use client';

import { useState } from 'react';
import { SubTitle, Pagination } from '@/components/common';
import { useProductStore } from '@/store/useProductStore';
import {
  InquiryDialog,
  ZoomPreview,
  ZoomProductImage,
} from '@/components/product';
import { Asterisk } from 'lucide-react';
import { Separator } from '@/components/ui';
import { Product } from '@/types/sample';

interface SampleListProps {
  title: string;
  mainImageUrl?: string;
  subImageUrl?: string;
  thirdImageUrl?: string;
  content: string;
  dataList: Product[];
}

const ITEMS_PER_PAGE = 15;

export const SampleList = ({ title, dataList }: SampleListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 }); // 확대 렌즈 위치
  const [zoomSrc, setZoomSrc] = useState<string | null>(null); // 현재 확대 중인 이미지 src
  const [zoomSide, setZoomSide] = useState<'left' | 'right'>('right'); // 마우스(호버 아이템) 위치

  const { addProduct, removeProduct, selectedProducts } = useProductStore();

  const handleSelectProduct = (product: Product) => {
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

      <div className='flex item-center justify-center text-[10px] sm:xs md:text-sm text-two/70 mb-4'>
        <Asterisk className='h-auto w-2 md:w-3' />
        <span className='break-keep'>
          하단에서 원하시는 제품을 선택한 후, 문의하기 버튼을 통해 상담을 진행해
          주세요.
        </span>
      </div>
      <Separator className='my-4 sm:my-6' />

      {/* 제품 리스트 */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {paginatedProducts.map((product) => {
          const isSelected = selectedProducts.some(
            (item) => item.id === product.id.toString()
          );

          return (
            <div
              key={product.id}
              className='group transition-transform duration-300 cursor-pointer border border-two-1'
            >
              <div
                onClick={() => handleSelectProduct(product)}
                className='flex flex-col gap-3 relative  mb-4'
              >
                <ZoomProductImage
                  src={product.image}
                  alt={product.name}
                  isZooming={zoomSrc === product.image}
                  isSelected={isSelected}
                  lensPos={lensPos}
                  onZoomStart={(e: React.MouseEvent) => {
                    setZoomSrc(product.image);

                    const rect = e.currentTarget.getBoundingClientRect();
                    const screenWidth = window.innerWidth;
                    const itemCenterX = rect.left + rect.width / 2;

                    // 아이템이 화면 오른쪽에 있으면 확대 이미지를 왼쪽에 띄우기
                    setZoomSide(
                      itemCenterX > screenWidth / 2 ? 'left' : 'right'
                    );
                  }}
                  onZoomEnd={() => {
                    setZoomSrc(null);
                  }}
                  onMoveLens={(pos) => setLensPos(pos)}
                />

                {/* 설명 */}
                <div className='ml-2 gap-3'>
                  <p className='text-two text-xs sm:text-sm md:text-base font-bold'>
                    {product.name}
                  </p>
                  <span className='text-two/60 text-xs sm:text-sm break-keep'>
                    {product.description}
                  </span>
                </div>

                {zoomSrc === product.image && (
                  <ZoomPreview
                    src={zoomSrc}
                    lensPos={lensPos}
                    position={zoomSide}
                  />
                )}
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
