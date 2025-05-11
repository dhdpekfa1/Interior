'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ZoomPreviewProps {
  src: string;
  lensPos: { x: number; y: number };
  lensSize: number;
  scale: number;
  position?: 'left' | 'right';
}

export const ZoomPreview = ({
  src,
  lensPos,
  lensSize,
  scale,
  position = 'right',
}: ZoomPreviewProps) => {
  const lensCenterX = lensPos.x + lensSize / 2;
  const lensCenterY = lensPos.y + lensSize / 2;
  const previewSize = Math.floor(lensSize * scale);
  const offsetX = Math.floor(lensCenterX * scale - previewSize / 2);
  const offsetY = Math.floor(lensCenterY * scale - previewSize / 2);

  return (
    <div
      className={cn(
        'absolute top-0 z-40 bg-white border shadow-lg overflow-hidden',
        position === 'right' ? 'left-full ml-3' : 'right-full mr-3',
        'hidden sm:block'
      )}
      style={{
        width: previewSize,
        height: previewSize,
      }}
    >
      <Image
        src={src}
        alt='확대 이미지'
        fill
        className='object-cover pointer-events-none'
        style={{
          transform: `translate(-${offsetX - 6}px, -${
            offsetY - 6
          }px) scale(${scale})`,
          transformOrigin: 'top left',
        }}
      />
    </div>
  );
};
