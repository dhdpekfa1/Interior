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

  const previewScale = 1.2;
  const scaledScale = scale * previewScale;
  const previewSize = Math.floor(lensSize * scaledScale);
  const offsetX = Math.floor(lensCenterX * scaledScale - previewSize / 2 - 8);
  const offsetY = Math.floor(lensCenterY * scaledScale - previewSize / 2 - 8);

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
        quality={100}
        className='object-cover pointer-events-none zoom-preview-img'
        style={{
          transform: `translate(-${offsetX}px, -${offsetY}px) scale(${scale})`,
          transformOrigin: 'top left',
        }}
      />
    </div>
  );
};
