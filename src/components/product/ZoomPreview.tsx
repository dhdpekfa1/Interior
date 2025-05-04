'use client';

import Image from 'next/image';

interface ZoomPreviewProps {
  src: string;
  lensPos: { x: number; y: number };
  scale?: number;
  width?: number;
  height?: number;
  position?: 'left' | 'right';
}

export const ZoomPreview = ({
  src,
  lensPos,
  scale = 2,
  width = 300,
  height = 300,
  position = 'right',
}: ZoomPreviewProps) => {
  return (
    <div
      className='absolute top-0 z-40 bg-white border shadow-lg overflow-hidden'
      style={{
        width,
        height,
        left: position === 'right' ? '100%' : undefined,
        right: position === 'left' ? '100%' : undefined,
        marginLeft: position === 'right' ? '12px' : undefined,
        marginRight: position === 'left' ? '12px' : undefined,
      }}
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
