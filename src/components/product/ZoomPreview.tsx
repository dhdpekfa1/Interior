'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ZoomPreviewProps {
  src: string;
  lensPos: { x: number; y: number };
  scale?: number;
  width?: number;
  height?: number;
  position: 'left' | 'right';
}

export const ZoomPreview = ({
  src,
  lensPos,
  scale = 2,
  width = 400,
  height = 400,
  position = 'right',
}: ZoomPreviewProps) => {
  return (
    <div
      className={cn(
        'fixed top-32 z-50 border shadow-lg overflow-hidden bg-white',
        position === 'right' ? 'right-10' : 'left-10'
      )}
      style={{ width, height }}
    >
      <Image
        src={src}
        alt='확대 이미지'
        fill
        className='object-cover pointer-events-none'
        style={{
          transform: `translate(-${lensPos.x * scale}px, -${
            lensPos.y * scale
          }px) scale(${scale})`,
          transformOrigin: 'top left',
        }}
      />
    </div>
  );
};
