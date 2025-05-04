'use client';

import Image from 'next/image';

interface ZoomPreviewProps {
  src: string;
  lensPos: { x: number; y: number };
  scale?: number;
  width?: number;
  height?: number;
}

export const ZoomPreview = ({
  src,
  lensPos,
  scale = 2,
  width = 400,
  height = 400,
}: ZoomPreviewProps) => {
  return (
    <div
      className='fixed top-32 right-10 z-50 border shadow-lg overflow-hidden bg-white'
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
