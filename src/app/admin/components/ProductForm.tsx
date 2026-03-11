'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { createClient } from '@/utils/supabase/client';

export type ProductFormState = {
  name: string;
  image: string;
  description: string;
};

type Props = {
  initialValues: ProductFormState;
  itemName?: string;
  submitLabel: string;
  isSubmitting: boolean;
  disabled?: boolean;
  showCancel?: boolean;
  onCancel?: () => void;
  onSubmit: (values: ProductFormState) => Promise<void> | void;
  onUploadErrorChange?: (hasError: boolean) => void;
};

const BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'product-images';

const getUploadErrorMessage = (error: unknown): string => {
  const message = error instanceof Error ? error.message : '';
  const statusCode = (error as { statusCode?: string | number } | null)
    ?.statusCode;

  if (
    message.includes('Storage quota exceeded') ||
    String(statusCode) === '413'
  ) {
    return '이번 달 스토리지 업로드 용량이 초과되었습니다. 개발자에게 문의하세요.';
  }

  if (message.includes('Payload too large')) {
    return '파일 크기가 너무 큽니다. (최대 5MB)';
  }

  return '이미지 업로드 중 오류가 발생했습니다.';
};

export function ProductForm({
  initialValues,
  itemName = '상품',
  submitLabel,
  isSubmitting,
  disabled = false,
  showCancel = false,
  onCancel,
  onSubmit,
  onUploadErrorChange,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, setValue, reset, control, formState } =
    useForm<ProductFormState>({
      defaultValues: initialValues,
    });

  const previewImage = useWatch({
    control,
    name: 'image',
  });

  useEffect(() => {
    reset(initialValues);
    setUploadError('');
    setSelectedFileName('');
  }, [initialValues, reset]);

  useEffect(() => {
    onUploadErrorChange?.(Boolean(uploadError));
  }, [uploadError, onUploadErrorChange]);

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

      const extension = file.name.split('.').pop() || 'png';
      const safeFileName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${extension}`;
      const filePath = `admin-products/${safeFileName}`;

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        });

      if (error) {
        setUploadError(getUploadErrorMessage(error));
        throw new Error(error.message);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(BUCKET).getPublicUrl(filePath);

      setValue('image', publicUrl, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } catch (error) {
      setUploadError((prev) => prev || getUploadErrorMessage(error));
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const openFilePicker = () => {
    if (!fileInputRef.current || uploading || disabled || isSubmitting) return;
    fileInputRef.current.value = '';
    fileInputRef.current.click();
  };

  const submitDisabled =
    disabled ||
    isSubmitting ||
    uploading ||
    !formState.isDirty ||
    !(previewImage ?? '').trim();

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(values))}
      className='flex flex-col gap-2'
    >
      <input
        className='w-full border px-2 py-1 text-sm'
        placeholder='상품명'
        {...register('name')}
        disabled={disabled || isSubmitting}
        required
      />
      <input type='hidden' {...register('image')} />

      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        multiple={false}
        disabled={uploading || disabled || isSubmitting}
        onChange={handleUploadImage}
        className='hidden'
      />

      <button
        type='button'
        onClick={openFilePicker}
        disabled={uploading || disabled || isSubmitting}
        className='h-32 w-full overflow-hidden border bg-gray-50 text-left disabled:cursor-not-allowed'
      >
        {previewImage ? (
          <Image
            src={previewImage}
            alt={`${itemName} 미리보기`}
            width={300}
            height={80}
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='flex h-full items-center justify-center text-xs text-gray-500'>
            미리보기를 클릭해 이미지 선택
          </div>
        )}
      </button>

      <p className='text-[10px] text-center text-gray-500'>
        {uploading ? (
          <Loader2 className='mx-auto size-4 animate-spin text-second' />
        ) : (
          selectedFileName || '미리보기를 클릭해 이미지 선택'
        )}
      </p>

      <textarea
        className='min-h-20 w-full border px-2 py-1 text-sm'
        placeholder='필요 시 간단한 상품 설명을 입력하세요.'
        {...register('description')}
        disabled={disabled || isSubmitting}
      />

      <div className='flex items-center justify-end gap-2'>
        <button
          type='submit'
          disabled={submitDisabled}
          className='bg-point/90 px-2 py-1 text-xs text-white disabled:opacity-50'
        >
          {isSubmitting || uploading ? (
            <Loader2 className='size-4 animate-spin text-second' />
          ) : (
            submitLabel
          )}
        </button>
        {showCancel && onCancel && (
          <button
            type='button'
            onClick={onCancel}
            className='border px-2 py-1 text-xs'
          >
            취소
          </button>
        )}
      </div>
    </form>
  );
}
