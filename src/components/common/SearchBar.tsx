'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, Input } from '@/components/ui';
import { Search as SearchIcon } from 'lucide-react';

export const SearchBar = ({
  value,
  onSubmit,
}: {
  value?: string;
  onSubmit: (search: string) => void;
}) => {
  const [search, setSearch] = useState(value || '');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setSearch(searchParams.get('searchWord') || '');
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSearch = search.trim();

    if (trimmedSearch) {
      router.push(`?searchWord=${encodeURIComponent(trimmedSearch)}`);
    }

    onSubmit(trimmedSearch);
  };

  return (
    <div className={cn('p-0')}>
      <form onSubmit={handleSubmit} className={cn('flex-1 flex gap-3')}>
        <div className={cn('relative w-full md:w-[300px]')}>
          <Input
            type='text'
            placeholder='검색어를 입력해주세요'
            className={cn(
              'border border-dd/50 rounded-md pr-8 text-xs md:text-sm',
              'placeholder:text-[#c9c9cb] opacity-90',
              'hover:opacity-100 hover:border-cream',
              'px-8',
              'text-two bg-ef'
            )}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon
            className={cn(
              'absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500',
              'w-3.5 md:w-4 h-auto'
            )}
            size={18}
          />
        </div>
        <Button
          type='submit'
          className={cn(
            'shrink-0 rounded-md bg-point/60 text-second text-center hover:bg-point/90 transition-colors border border-cream/50 '
          )}
        >
          <span
            className={cn('md:px-1', 'text-wiz-white/80 text-xs md:text-sm')}
          >
            검색
          </span>
        </Button>
      </form>
    </div>
  );
};
