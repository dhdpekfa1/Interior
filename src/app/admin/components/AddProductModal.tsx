'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { ADMIN_PRODUCT_CATEGORIES } from '@/lib/admin-product';
import { ProductForm, ProductFormState } from './ProductForm';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formVersion: number;
  initialValues: ProductFormState;
  currentCategory: string;
  isSubmitting: boolean;
  onSubmit: (category: string, values: ProductFormState) => Promise<void> | void;
};

export function AddProductModal({
  open,
  onOpenChange,
  formVersion,
  initialValues,
  currentCategory,
  isSubmitting,
  onSubmit,
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);

  useEffect(() => {
    if (open) {
      setSelectedCategory(currentCategory);
    }
  }, [open, currentCategory]);

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
        <div className='mb-2'>
          <Label htmlFor='admin-product-category'>카테고리</Label>
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            <SelectTrigger
              id='admin-product-category'
              className='mt-1 w-full text-xs sm:text-sm md:text-base'
            >
              <SelectValue placeholder='선택하기' />
            </SelectTrigger>
            <SelectContent
              position='popper'
              side='bottom'
              className='z-50 bg-point/90 text-ef text-xs sm:text-sm md:text-base'
            >
            {ADMIN_PRODUCT_CATEGORIES.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
            </SelectContent>
          </Select>
        </div>
        <ProductForm
          key={formVersion}
          initialValues={initialValues}
          itemName='등록 상품'
          submitLabel='등록'
          isSubmitting={isSubmitting}
          onSubmit={(values) => onSubmit(selectedCategory, values)}
          showCancel
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
