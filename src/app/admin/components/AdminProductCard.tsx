'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { Product } from '@/types/sample';
import { cn } from '@/lib/utils';
import { ProductForm } from './ProductForm';
import { ProductFormState } from '@/app/admin/components';

type Props = {
  item: Product;
  imageSrc: string;
  isEditing: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  onStartEdit: (item: Product) => void;
  onDelete: (id: string) => void;
  onSubmitEdit: (id: string, values: ProductFormState) => Promise<void>;
  onCancelEdit: () => void;
};

export function AdminProductCard({
  item,
  imageSrc,
  isEditing,
  isDeleting,
  isUpdating,
  onStartEdit,
  onDelete,
  onSubmitEdit,
  onCancelEdit,
}: Props) {
  const isProcessing = isDeleting || isUpdating;
  const [hasUploadError, setHasUploadError] = useState(false);
  const initialValues = useMemo(
    () => ({
      name: item.name ?? '',
      image: imageSrc ?? '',
      description: item.description ?? '',
    }),
    [item.name, item.description, imageSrc],
  );

  return (
    <article className='relative [perspective:1000px]'>
      <div
        className={`relative h-[300px] w-full transition-transform duration-500 [transform-style:preserve-3d] ${
          isEditing ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <div
          className={cn(
            'absolute inset-0 overflow-hidden border bg-white [backface-visibility:hidden]',
            hasUploadError && 'border-red-500',
          )}
        >
          <div className='relative h-full'>
            <Image
              src={imageSrc || '/favicon.ico'}
              alt={item.name}
              width={300}
              height={200}
              className='h-full w-full object-cover'
            />
            <div className='absolute bottom-0 right-0 bg-white/75 px-2 py-1 text-sm font-semibold text-black'>
              {item.name}
            </div>
            <div className='absolute right-2 top-2 flex gap-1'>
              <button
                type='button'
                onClick={() => onStartEdit(item)}
                className='border border-white bg-dd/90 px-2 py-1 text-xs text-point'
              >
                수정
              </button>
              <button
                type='button'
                disabled={isDeleting}
                onClick={() => onDelete(item.id)}
                className='border border-ef bg-red-500 px-2 py-1 text-xs text-ef disabled:opacity-50'
              >
                삭제
              </button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            'absolute inset-0 space-y-2 border p-3 [backface-visibility:hidden] [transform:rotateY(180deg)]',
            'flex flex-col gap-2',
            hasUploadError && 'border-red-500',
          )}
        >
          <p className='text-sm font-semibold'>상품 수정</p>
          <ProductForm
            initialValues={initialValues}
            itemName={item.name}
            submitLabel='저장'
            isSubmitting={isUpdating}
            disabled={isProcessing}
            showCancel
            onCancel={onCancelEdit}
            onSubmit={(values) => onSubmitEdit(item.id, values)}
            onUploadErrorChange={setHasUploadError}
          />
        </div>
      </div>
      {isProcessing && (
        <div className='absolute inset-0 z-20 flex items-center justify-center bg-black/20'>
          <Loader2 className='size-6 animate-spin text-second' />
        </div>
      )}
    </article>
  );
}
