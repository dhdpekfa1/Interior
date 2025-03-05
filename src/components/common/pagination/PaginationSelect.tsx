import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { PaginationProps } from './Pagination';

const PaginationSelect = ({
  currentPage,
  limit = 10,
  total,
  onChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <Select
      value={currentPage.toString()}
      onValueChange={(value) => onChange(Number(value))}
    >
      <SelectTrigger className='w-full bg-ef/30 hover:text-two text-two cursor-pointer'>
        <SelectValue placeholder={`${currentPage} 페이지`} />
      </SelectTrigger>
      <SelectContent className=''>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <SelectItem key={page} value={page.toString()}>
            {page} 페이지
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { PaginationSelect };
