'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea,
  Separator,
} from '@/components/ui';
import { Button } from '@/components/ui';
import { useProductStore } from '@/store/useProductStore';
import { InquiryForm } from './InquiryForm';
import { ProductCounter } from './ProductCounter';

export const InquiryDialog = () => {
  const { selectedProducts } = useProductStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={selectedProducts.length === 0}
          className='px-6 py-3 rounded-lg bg-point text-white hover:bg-point/80 disabled:bg-gray-400'
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
        </DialogHeader>

        <ScrollArea className='max-h-[80vh] overflow-auto'>
          {/* 선택된 상품 목록 */}
          <ScrollArea className='max-h-40 overflow-auto border rounded-md p-2 bg-white mb-4'>
            {selectedProducts.map((product) => (
              <div
                key={product.id}
                className='flex justify-between items-center py-1 gap-2 text-xs sm:text-sm md:text-base'
              >
                <span>{product.name}</span>
                {/* 카운터 */}
                <ProductCounter id={product.id} count={product.count} />
              </div>
            ))}
          </ScrollArea>

          <Separator />

          {/* 문의하기 폼 */}
          <InquiryForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
