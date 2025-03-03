'use client';

import { Minus, Plus, X } from 'lucide-react';
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

export const InquiryDialog = () => {
  const { selectedProducts, updateCount, removeProduct } = useProductStore();

  const handleCountChange = (id: string, newCount: number) => {
    if (newCount < 1) return; // 1 이하 방지
    updateCount(id, newCount);
  };

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
          <ScrollArea className='max-h-40 border rounded-md p-2 bg-white mb-4'>
            {selectedProducts.map((product) => (
              <div
                key={product.id}
                className='flex justify-between items-center py-1 gap-2 text-xs sm:text-sm md:text-base'
              >
                <span>{product.name}</span>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-1 border rounded-sm'>
                    <Button
                      type='button'
                      size='icon'
                      variant='ghost'
                      disabled={product.count <= 1}
                      onClick={() =>
                        handleCountChange(product.id, product.count - 1)
                      }
                      className='h-5 w-5 md:h-6 md:w-6 p-0'
                    >
                      <Minus width={2} height={2} />
                    </Button>
                    <p className='text-center w-4'>{product.count}</p>
                    <Button
                      type='button'
                      size='icon'
                      variant='ghost'
                      onClick={() =>
                        handleCountChange(product.id, product.count + 1)
                      }
                      className='h-5 w-5 md:h-6 md:w-6 p-0'
                    >
                      <Plus width={2} height={2} />
                    </Button>
                  </div>
                  {/* 제거 버튼 */}
                  <Button
                    type='button'
                    size='icon'
                    onClick={() => removeProduct(product.id)}
                    className='h-5 w-5 md:h-6 md:w-6 p-0 bg-point/50 hover:bg-point'
                  >
                    <X width={2} height={2} />
                  </Button>
                </div>
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
