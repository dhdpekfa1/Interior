'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { useRef, useEffect } from 'react';

interface Props {
  src: string;
  alt: string;
  isZooming: boolean;
  isSelected: boolean;
  lensPos: { x: number; y: number };
  lensSize: number;
  onZoomStart: (e: React.MouseEvent) => void;
  onZoomEnd: () => void;
  onMoveLens: (pos: { x: number; y: number }) => void;
  onImageLoad: (width: number) => void;
}

export const ZoomProductImage = ({
  src,
  alt,
  isZooming,
  isSelected,
  lensPos,
  lensSize,
  onZoomStart,
  onZoomEnd,
  onMoveLens,
  onImageLoad,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const width = ref.current.offsetWidth;
      onImageLoad(width);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;

    let x = e.clientX - bounds.left - lensSize / 2;
    let y = e.clientY - bounds.top - lensSize / 2;

    x = Math.max(0, Math.min(x, bounds.width - lensSize));
    y = Math.max(0, Math.min(y, bounds.height - lensSize));

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
      <Image src={src} alt={alt} fill className='object-cover duration-300' />
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
      <div
        className={cn(
          'absolute border border-gray-400 bg-white/40 pointer-events-none hidden',
          isZooming ? 'sm:block' : 'hidden'
        )}
        style={{
          width: lensSize,
          height: lensSize,
          left: lensPos.x,
          top: lensPos.y,
        }}
      />
    </div>
  );
};
