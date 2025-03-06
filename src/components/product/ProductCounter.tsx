'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Minus, Plus, X } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { useProductStore } from '@/store/useProductStore';

interface ProductCounterProps {
  id: string;
  count: number;
  showRemoveButton?: boolean;
  onRemove?: (id: string) => void;
}

export const ProductCounter = ({
  id,
  count,
  showRemoveButton = true,
  onRemove,
}: ProductCounterProps) => {
  const { updateCount } = useProductStore();
  const [inputValue, setInputValue] = useState(count.toString());

  // count 변경되면 inputValue도 동기화
  useEffect(() => {
    setInputValue(count > 0 ? count.toString() : '');
  }, [count]);

  const handleCountChange = (newCount: number) => {
    if (newCount < 1) return;
    updateCount(id, newCount);
  };

  const handleInputChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleBlur = () => {
    const number = parseInt(inputValue, 10);

    if (!inputValue || !number || number < 1) {
      setInputValue('1');
      updateCount(id, 1);
    } else {
      updateCount(id, number);
    }
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
          type='text'
          inputMode='numeric'
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleBlur}
          placeholder='0'
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
