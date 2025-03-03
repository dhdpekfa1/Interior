'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
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
  const { selectedProducts } = useProductStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          // disabled={selectedProducts.length === 0}
          className='px-6 py-3 rounded-lg bg-point text-white hover:bg-point/80 disabled:bg-gray-400'
        >
          문의하기
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-3xl bg-ef'>
        <DialogHeader>
          <div className='flex justify-between items-center'>
            <DialogTitle className='text-point text-lg sm:text-xl md:text-2xl'>
              문의하기
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* ✅ 선택된 상품 목록 */}
        <ScrollArea className='max-h-40 border rounded-md p-2 bg-white mb-4'>
          {selectedProducts.map((product) => (
            <div
              key={product.id}
              className='flex justify-between text-sm sm:text-base py-1'
            >
              <span>{product.name}</span>
              <span>{product.count}개</span>
            </div>
          ))}
        </ScrollArea>

        <Separator />

        {/* ✅ 문의하기 폼 */}
        <InquiryForm />
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
};
