'use client';

import { cn } from '@/lib/utils';
import { Minus, Plus, X } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { useProductStore } from '@/store/useProductStore';

interface ProductCounterProps {
  id: string;
  count: number;
  onRemove?: (id: string) => void;
  showRemoveButton?: boolean;
}

export const ProductCounter = ({
  id,
  count,
  onRemove,
  showRemoveButton = true,
}: ProductCounterProps) => {
  const { updateCount } = useProductStore();

  const handleCountChange = (newCount: number) => {
    if (newCount < 1) return;
    updateCount(id, newCount);
  };

  const handleInputChange = (value: string) => {
    const number = parseInt(value, 10);
    if (!value) return; // 빈 값 입력 방지
    if (number < 1) return; // 1보다 작은 값 입력 방지
    updateCount(id, number);
  };

  return (
    <div className='flex items-center gap-2'>
      <div
        className={cn(
          'flex items-center justify-center gap-1 border rounded-sm',
          !showRemoveButton ? 'bg-point text-white/80 ' : ''
        )}
      >
        <Button
          type='button'
          size='icon'
          variant='ghost'
          disabled={count <= 1}
          onClick={() => handleCountChange(count - 1)}
          className='h-5 w-5 md:h-6 md:w-6 p-0'
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
            showRemoveButton ? 'bg-white' : 'bg-point'
          )}
        />

        <Button
          type='button'
          size='icon'
          variant='ghost'
          onClick={() => handleCountChange(count + 1)}
          className='h-5 w-5 md:h-6 md:w-6 p-0'
        >
          <Plus width={12} height={12} />
        </Button>
      </div>

      {/* 삭제 버튼 */}
      {showRemoveButton && (
        <Button
          type='button'
          size='icon'
          onClick={() => onRemove?.(id)}
          className='h-5 w-5 md:h-6 md:w-6 p-0 bg-point/50 hover:bg-point'
        >
          <X width={12} height={12} />
        </Button>
      )}
    </div>
  );
};
