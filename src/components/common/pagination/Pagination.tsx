import { cn } from '@/lib/utils';
import { PaginationSelect, PaginationList } from '@/components/common';

export type PaginationProps = {
  currentPage: number;
  total: number;
  limit?: number;
  showPages?: number;
  onChange: (page: number) => void;
  className?: string;
};

export const Pagination = (props: PaginationProps) => {
  return (
    <>
      <div className={cn('lg:hidden', props.className)}>
        <PaginationSelect {...props} />
      </div>
      <div className={cn('hidden lg:block text-ef', props.className)}>
        <PaginationList {...props} />
      </div>
    </>
  );
};
