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
  Button,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { useProductStore } from '@/store/useProductStore';
import { InquiryForm } from './InquiryForm';
import { ProductCounter } from './ProductCounter';
import { MailQuestion } from 'lucide-react';

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
    <div className='fixed bottom-6 right-10 md:bottom-32 md:right-12'>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            className='relative group'
            onClick={(e) => {
              if (selectedProducts.length === 0) {
                e.preventDefault();
              }
            }}
          >
            <Button
              className={cn(
                'w-16 h-16 rounded-full text-white shadow-point shadow-md flex items-center justify-center slow-bounce relative',
                selectedProducts.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-point hover:bg-point'
              )}
            >
              {/* 툴팁 문구 */}
              <MailQuestion className='w-20 h-20' />
              {selectedProducts.length === 0 && (
                <div className='absolute bottom-full mb-2 w-max px-3 py-1 text-[10px] md:text-xs text-white bg-two/90 opacity-0 group-hover:opacity-100 transition-opacity'>
                  제품을 선택 후 문의하세요!
                </div>
              )}
            </Button>
          </div>
        </DialogTrigger>

        <DialogContent className='w-full md:w-[80%] max-w-3xl bg-white overflow-scroll rounded-none'>
          <DialogHeader>
            <div className='flex justify-between items-center'>
              <DialogTitle className='text-point text-lg sm:text-xl md:text-2xl'>
                문의접수
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
    </div>
  );
};
