import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui';
import { getPageRange } from '@/services/get-page-range.service';
import { cn } from '@/lib/utils';
import { PaginationProps } from '@/components/common';

const PaginationList = ({
  currentPage,
  limit = 10,
  total,
  showPages = 5,
  onChange,
  className,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / limit);
  const { start, end } = getPageRange(showPages, currentPage, totalPages);

  return (
    <Pagination className={className}>
      <PaginationContent>
        {/* 이전 페이지 */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onChange(currentPage - 1)}
            className={
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>

        {/* 첫 페이지 */}
        {start > 1 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => onChange(1)}>1</PaginationLink>
            </PaginationItem>
            {start > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {/* 페이지 번호 */}
        {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
          (page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => onChange(page)}
                className={cn(
                  'transition-colors duration-200',
                  currentPage === page
                    ? 'bg-wiz-red hover:bg-wiz-red/90'
                    : 'hover:bg-white/10'
                )}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* 마지막 페이지 */}
        {end < totalPages && (
          <>
            {end < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink onClick={() => onChange(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* 다음 페이지 */}
        <PaginationItem>
          <PaginationNext
            onClick={() => onChange(currentPage + 1)}
            className={
              currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export { PaginationList };
