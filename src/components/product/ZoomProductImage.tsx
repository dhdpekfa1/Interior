'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

interface Props {
  src: string;
  alt: string;
  isZooming: boolean;
  isSelected: boolean;
  lensPos: { x: number; y: number };
  onZoomStart: (e: React.MouseEvent) => void;
  onZoomEnd: () => void;
  onMoveLens: (pos: { x: number; y: number }) => void;
}

export const ZoomProductImage = ({
  src,
  alt,
  isZooming,
  isSelected,
  lensPos,
  onZoomStart,
  onZoomEnd,
  onMoveLens,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const lensSize = 100;

  const handleMouseMove = (e: React.MouseEvent) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = e.clientX - bounds.left - lensSize / 2;
    const y = e.clientY - bounds.top - lensSize / 2;
    onMoveLens({ x, y });
  };

  return (
    <div
      className='relative w-full aspect-square overflow-hidden'
      ref={ref}
      onMouseEnter={onZoomStart}
      onMouseLeave={onZoomEnd}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className='object-cover duration-300 hover:scale-125'
      />
      <Check
        className={cn(
          'absolute top-2 right-2 text-point bg-white',
          'transition-all duration-300',
          isSelected
            ? 'opacity-100 visible scale-100'
            : 'opacity-0 invisible scale-95'
        )}
        size={24}
      />
      {/* 렌즈 */}
      <div
        className='absolute border border-gray-400 bg-white/40 pointer-events-none hidden sm:block'
        style={{
          width: lensSize,
          height: lensSize,
          left: lensPos.x,
          top: lensPos.y,
          display: isZooming ? 'block' : 'none',
        }}
      />
    </div>
  );
};
