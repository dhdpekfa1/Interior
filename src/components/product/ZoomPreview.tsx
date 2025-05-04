'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ZoomPreviewProps {
  src: string;
  lensPos: { x: number; y: number };
  scale?: number;
  position?: 'left' | 'right';
}

export const ZoomPreview = ({
  src,
  lensPos,
  scale = 2,
  position = 'right',
}: ZoomPreviewProps) => {
  return (
    <div
      className={cn(
        // TODO: sm 미만에서 보여줄 건지 확인 (hidden sm:block)
        'absolute top-0 z-40 bg-white border shadow-lg overflow-hidden',
        position === 'right' ? 'left-full ml-3' : 'right-full mr-3',
        'w-[105%] sm:w-[260px] md:w-[300px] aspect-square sm:aspect-square'
      )}
    >
      <Image
        src={src}
        alt='확대 이미지'
        fill
        className='object-cover pointer-events-none overflow-hidden'
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
