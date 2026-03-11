'use client';

import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { ProductForm, ProductFormState } from './ProductForm';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formVersion: number;
  initialValues: ProductFormState;
  isSubmitting: boolean;
  onSubmit: (values: ProductFormState) => Promise<void> | void;
};

export function AddProductModal({
  open,
  onOpenChange,
  formVersion,
  initialValues,
  isSubmitting,
  onSubmit,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button
          type='button'
          className='flex items-center gap-1 border px-3 py-2 text-sm'
        >
          <Plus className='size-4' />
          상품 등록
        </button>
      </DialogTrigger>
      <DialogContent className='max-w-lg'>
        <DialogTitle>상품 등록</DialogTitle>
        <ProductForm
          key={formVersion}
          initialValues={initialValues}
          itemName='등록 상품'
          submitLabel='등록'
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          showCancel
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
