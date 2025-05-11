'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea,
  Button,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { useProductStore } from '@/store/useProductStore';
import { InquiryForm } from './InquiryForm';
import { MailQuestion, X } from 'lucide-react';

export const InquiryDialog = () => {
  const [open, setOpen] = useState(false); // dialog
  const [showNotice, setShowNotice] = useState(true); // 제품 선택 문구

  const { selectedProducts } = useProductStore();

  return (
    <div className='fixed bottom-32 right-6'>
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
            <div className='fixed bottom-28 right-6 flex flex-col items-end gap-2 z-50'>
              {/* 안내 메시지 */}
              {showNotice && (
                <div className='flex items-center gap-2 md:gap-3 px-2 py-1 md:px-4 md:py-2 shadow-sm slow-bounce bg-black/80'>
                  <span className='font-medium text-[10px] sm:text-xs md:text-sm text-dd'>
                    제품 선택 후 문의하세요.
                  </span>
                  <button
                    className='text-gray-400 hover:text-dd'
                    onClick={() => setShowNotice(false)}
                  >
                    <X className='w-3 md:w-4 h-auto' />
                  </button>
                </div>
              )}

              {/* 문의 버튼 */}
              <Button
                className={cn(
                  'w-10 h-10 md:w-12 md:h-12 text-white shadow-point shadow-md flex items-center justify-center',
                  selectedProducts.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-point hover:bg-point'
                )}
              >
                <MailQuestion className='w-6 h-6' />
              </Button>
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className='w-full md:w-[80%] max-w-3xl bg-white overflow-scroll rounded-none'>
          <DialogHeader>
            <div className='flex justify-between items-center'>
              <DialogTitle className='text-point text-lg sm:text-xl md:text-2xl'>
                문의접수
              </DialogTitle>
            </div>
          </DialogHeader>

          <ScrollArea className='max-h-[80vh] overflow-auto'>
            {/* 선택된 상품 목록 */}
            <ScrollArea className='max-h-40 overflow-auto border px-2 bg-white mb-4'>
              {selectedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className='flex justify-between items-center py-1 gap-2 text-xs sm:text-sm md:text-base'
                >
                  <span>
                    {index + 1}. {product.name}
                  </span>
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
