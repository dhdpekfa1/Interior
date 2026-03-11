'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { Product } from '@/types/sample';
import { createClient } from '@/utils/supabase/client';
import { cn } from '@/lib/utils';
import { useForm, useWatch } from 'react-hook-form';

export type ProductFormState = {
  name: string;
  image: string;
  description: string;
};

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

export default function AdminProductCard({
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
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const isProcessing = isDeleting || isUpdating;
  const hasUploadError = Boolean(uploadError);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, setValue, reset, control, formState } =
    useForm<ProductFormState>({
      defaultValues: {
        name: item.name ?? '',
        image: imageSrc ?? '',
        description: item.description ?? '',
      },
    });
  const previewImage = useWatch({
    control,
    name: 'image',
  });

  useEffect(() => {
    if (!isEditing) return;
    reset({
      name: item.name ?? '',
      image: imageSrc ?? '',
      description: item.description ?? '',
    });
    setUploadError('');
    setSelectedFileName('');
  }, [isEditing, item.name, item.description, imageSrc, reset]);

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFileName(file.name);

    setUploadError('');
    setUploading(true);

    try {
      const supabase = createClient();

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setUploadError('로그인이 필요한 서비스입니다.');
        event.target.value = '';
        return;
      }

      const bucket = 'product-images';

      // 확장자 추출
      const extension = file.name.split('.').pop() || 'png';

      // 파일명 안전하게 만들기 (한글 제거 및 랜덤 문자열 생성)
      // 원본 파일명에서 한글/특수문자를 제거하거나, 아예 고유한 ID로 대체하는 것이 가장 안전합니다.
      const safeFileName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${extension}`;

      // 경로 설정 (원본 파일명 대신 safeFileName 사용)
      const filePath = `admin-products/${safeFileName}`;

      const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        });

      if (error) throw new Error(error.message);

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(filePath);

      setValue('image', publicUrl, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : '이미지 업로드 중 오류가 발생했습니다.',
      );
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const openFilePicker = () => {
    if (!fileInputRef.current || uploading) return;
    fileInputRef.current.value = '';
    fileInputRef.current.click();
  };

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

        <form
          onSubmit={handleSubmit((values) => onSubmitEdit(item.id, values))}
          className={cn(
            'absolute inset-0 space-y-2 border p-3 [backface-visibility:hidden] [transform:rotateY(180deg)]',
            'flex flex-col gap-2',
            hasUploadError && 'border-red-500',
          )}
        >
          <p className='text-sm font-semibold'>상품 수정</p>
          <div>
            <input
              className='w-full border px-2 py-1 text-sm'
              placeholder='상품명'
              {...register('name')}
              required
            />
            <input
              className='w-full border px-2 py-1 text-sm'
              placeholder='이미지 URL'
              readOnly
              {...register('image')}
              required
              disabled
              type='hidden'
            />
          </div>

          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            multiple={false}
            disabled={uploading}
            onChange={handleUploadImage}
            className='hidden'
          />
          <button
            type='button'
            onClick={openFilePicker}
            disabled={uploading || isProcessing}
            className='h-32 w-full overflow-hidden border bg-gray-50 text-left disabled:cursor-not-allowed'
          >
            {previewImage ? (
              <Image
                src={previewImage}
                alt={`${item.name} 미리보기`}
                width={300}
                height={80}
                className='h-full w-full object-cover'
              />
            ) : (
              <div className='flex h-full items-center justify-center text-xs text-gray-500'>
                업로드된 이미지 미리보기
              </div>
            )}
          </button>
          <p className='text-[10px] text-center text-gray-500'>
            {uploading ? (
              <Loader2 className='size-4 animate-spin text-second' />
            ) : (
              selectedFileName || '미리보기를 클릭해 이미지 선택'
            )}
          </p>
          <div className='flex items-center justify-end gap-2'>
            <button
              type='submit'
              disabled={isProcessing || uploading || !formState.isDirty}
              className='bg-point/90 px-2 py-1 text-xs text-white disabled:opacity-50'
            >
              {isProcessing || uploading ? (
                <Loader2 className='size-4 animate-spin text-second' />
              ) : (
                '저장'
              )}
            </button>
            <button
              type='button'
              onClick={onCancelEdit}
              className='border px-2 py-1 text-xs'
            >
              취소
            </button>
          </div>
        </form>
      </div>
      {isProcessing && (
        <div className='absolute inset-0 z-20 flex items-center justify-center bg-black/20'>
          <Loader2 className='size-6 animate-spin text-second' />
        </div>
      )}
    </article>
  );
}
