'use client';

import { cn } from '@/lib/utils';
import { Minus, Plus, X } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { useProductStore } from '@/store/useProductStore';

interface ProductCounterProps {
  id: string;
  count: number;
  onRemove?: (id: string) => void;
}

export const ProductCounter = ({
  id,
  count,
  onRemove,
}: ProductCounterProps) => {
  const { updateCount } = useProductStore();

  const handleCountChange = (newCount: number) => {
    if (newCount < 1) return;
    updateCount(id, newCount);
  };

  const handleInputChange = (value: string) => {
    const number = parseInt(value, 10);
    if (!value) return;
    if (number < 1) return;
    updateCount(id, number);
  };

  return (
    <div className='flex items-center gap-2'>
      <div className={cn('flex items-center justify-center gap-1 border')}>
        <Button
          type='button'
          size='icon'
          variant='ghost'
          disabled={count <= 1}
          onClick={() => handleCountChange(count - 1)}
          className='h-5 w-5 md:h-6 md:w-6 p-0 hover:bg-point/50 hover:text-white'
        >
          <Minus width={12} height={12} />
        </Button>

        <Input
          type='number'
          value={count}
          onChange={(e) => handleInputChange(e.target.value)}
          min={1}
          className={cn(
            'appearance-none text-center w-8 h-fit md:w-10 text-xs sm:text-sm md:text-base p-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0',
            'bg-white'
          )}
        />

        <Button
          type='button'
          size='icon'
          variant='ghost'
          onClick={() => handleCountChange(count + 1)}
          className='h-5 w-5 md:h-6 md:w-6 p-0 hover:bg-point/50 hover:text-white'
        >
          <Plus width={12} height={12} />
        </Button>
      </div>

      {/* 삭제 버튼 */}
      <Button
        type='button'
        size='icon'
        onClick={() => onRemove?.(id)}
        className='h-5 w-5 md:h-6 md:w-6 p-0 bg-point/50 hover:bg-point/70'
      >
        <X width={12} height={12} />
      </Button>
    </div>
  );
};
