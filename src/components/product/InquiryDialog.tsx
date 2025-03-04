'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  ScrollArea,
} from '@/components/ui';
import { Button } from '@/components/ui';
import { useProductStore } from '@/store/useProductStore';
import { InquiryForm } from './InquiryForm';
import { ProductCounter } from './ProductCounter';

export const InquiryDialog = () => {
  const [open, setOpen] = useState(false);
  const { selectedProducts, removeProduct } = useProductStore();

  const handleRemoveProduct = (id: string) => {
    if (selectedProducts.length === 1) {
      // 마지막 상품 알림
      const confirmClose = window.confirm(
        `마지막 상품을 삭제하시면 문의가 종료되며, \n다시 상품을 선택 후 이용 가능합니다. 정말 삭제하시겠습니까?`
      );
      if (confirmClose) {
        removeProduct(id);
        setOpen(false);
      }
    } else {
      removeProduct(id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={selectedProducts.length === 0}
          className='px-6 py-3 bg-point text-white hover:bg-point/80 disabled:bg-gray-400'
        >
          문의하기
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-3xl bg-ef overflow-scroll'>
        <DialogHeader>
          <div className='flex justify-between items-center'>
            <DialogTitle className='text-point text-lg sm:text-xl md:text-2xl'>
              문의하기
            </DialogTitle>
          </div>
          <DialogDescription>
            제품 수량을 확인 후 문의 내용을 작성해주세요.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className='max-h-[80vh] overflow-auto'>
          {/* 선택된 상품 목록 */}
          <ScrollArea className='max-h-40 overflow-auto border px-2 bg-white mb-4'>
            {selectedProducts.map((product) => (
              <div
                key={product.id}
                className='flex justify-between items-center py-1 gap-2 text-xs sm:text-sm md:text-base'
              >
                <span>{product.name}</span>
                {/* 카운터 */}
                <ProductCounter
                  id={product.id}
                  count={product.count}
                  onRemove={handleRemoveProduct}
                />
              </div>
            ))}
          </ScrollArea>

          {/* 문의하기 폼 */}
          <InquiryForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
