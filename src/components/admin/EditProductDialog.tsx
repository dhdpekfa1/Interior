'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Label,
  Input,
  DialogFooter,
} from '@/components/ui';
import Image from 'next/image';

interface EditProductDialogProps {
  onEditProduct: (editedProduct: {
    name: string;
    description: string;
    image: string;
  }) => void;
  name: string;
  description: string;
  image: string;
}

export const EditProductDialog = ({
  name: initialName,
  description: initialDescription,
  image: initialImage,
  onEditProduct,
}: EditProductDialogProps) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [image, setImage] = useState(initialImage);

  // 파일 업로드 핸들러 (이미지 URL 변환)
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      console.log();
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-point/90 hover:bg-point flex-1 w-fit'>
          수정
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>제품 정보 수정</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4 py-4'>
          {/* 품명 */}
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              품명
            </Label>
            <Input
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='col-span-3 rounded-none'
            />
          </div>

          {/* 이미지 업로드 */}
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='image' className='text-right'>
              사진
            </Label>
            <input
              type='file'
              id='image'
              accept='image/*'
              onChange={handleImageUpload}
              className='col-span-3 border p-2'
            />
          </div>

          {/* 이미지 미리보기 */}
          {image && (
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className='text-right'>미리보기</Label>
              <Image
                src={image}
                alt='미리보기'
                width={200}
                height={200}
                className='col-span-3  shadow-md max-h-32'
              />
            </div>
          )}

          {/* 설명 */}
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              설명
            </Label>
            <textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='col-span-3 border p-2 resize-none'
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() =>
              onEditProduct({
                name,
                description,
                image,
              })
            }
            className='bg-point/90 hover:bg-point'
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
