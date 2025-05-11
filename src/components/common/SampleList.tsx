'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SubTitle, Pagination } from '@/components/common';
import { useProductStore } from '@/store/useProductStore';
import {
  InquiryDialog,
  ZoomPreview,
  ZoomProductImage,
} from '@/components/product';
import { Asterisk } from 'lucide-react';
import { Product } from '@/types/sample';

interface SampleListProps {
  title: string;
  dataList: Product[];
}

const ITEMS_PER_PAGE = 15;

export const SampleList = ({ title, dataList }: SampleListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);
  const [zoomSide, setZoomSide] = useState<'left' | 'right'>('right');
  const [imageWidth, setImageWidth] = useState(0);

  const lensSize = imageWidth ? imageWidth * 0.25 : 70;
  const scale = imageWidth ? imageWidth / lensSize : 1.6;

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

      {dataList.length < 1 && (
        <div>
          <p className='text-center'>상품 준비 중입니다. 곧 찾아뵙겠습니다.</p>
        </div>
      )}

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {paginatedProducts.map((product, index) => {
          const isSelected = selectedProducts.some(
            (item) => item.id === product.id.toString()
          );

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40, x: 0 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0, 0, 0.2, 1],
              }}
              className='group cursor-pointer'
            >
              <div
                onClick={() => handleSelectProduct(product)}
                className='flex flex-col gap-3 relative mb-4'
              >
                <div className='relative'>
                  <ZoomProductImage
                    src={product.image}
                    alt={product.name}
                    isZooming={zoomSrc === product.image}
                    isSelected={isSelected}
                    lensPos={lensPos}
                    lensSize={lensSize}
                    onZoomStart={(e: React.MouseEvent) => {
                      setZoomSrc(product.image);

                      const rect = e.currentTarget.getBoundingClientRect();
                      const screenWidth = window.innerWidth;
                      const itemCenterX = rect.left + rect.width / 2;

                      setZoomSide(
                        itemCenterX > screenWidth / 2 ? 'left' : 'right'
                      );
                    }}
                    onZoomEnd={() => setZoomSrc(null)}
                    onMoveLens={(pos) => setLensPos(pos)}
                    onImageLoad={(width) => setImageWidth(width)}
                  />

                  <div className='absolute bottom-0 right-0 bg-white/70 px-2 py-1 shadow text-two text-sm md:text-base lg:text-lg font-semibold'>
                    {product.name}
                  </div>
                </div>
                {zoomSrc === product.image && (
                  <ZoomPreview
                    src={zoomSrc}
                    lensPos={lensPos}
                    lensSize={lensSize}
                    scale={scale}
                    position={zoomSide}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className='mt-10 flex justify-center'>
        <InquiryDialog />
      </div>

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
