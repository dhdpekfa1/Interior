'use client';

import { AlignLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ADMIN_PRODUCT_CATEGORIES } from '@/lib/admin-product';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui';

type Props = {
  category: string;
  sidebarOpen: boolean;
  onSidebarOpenChange: (open: boolean) => void;
  onCategoryChange: (category: string) => void;
  onLogout: () => void;
};

export function AdminCategorySidebar({
  category,
  sidebarOpen,
  onSidebarOpenChange,
  onCategoryChange,
  onLogout,
}: Props) {
  return (
    <div>
      <div className='lg:hidden'>
        <Sheet open={sidebarOpen} onOpenChange={onSidebarOpenChange}>
          <SheetTrigger asChild>
            <button
              type='button'
              className='fixed left-4 top-10 z-40 border bg-point/90 p-2 text-white shadow'
              aria-label='카테고리 사이드바 열기'
            >
              <AlignLeft className='size-5' />
            </button>
          </SheetTrigger>
          <SheetContent
            side='left'
            className='flex h-full w-64 flex-col bg-white p-4'
          >
            <SheetHeader>
              <SheetTitle className='text-point'>카테고리</SheetTitle>
            </SheetHeader>
            <div className='mt-4 flex min-h-0 flex-1 flex-col justify-between pb-4'>
              <div className='space-y-2 overflow-y-auto pr-1'>
                {ADMIN_PRODUCT_CATEGORIES.map((item) => {
                  const isActive = item.value === category;
                  return (
                    <SheetClose asChild key={item.value}>
                      <button
                        type='button'
                        onClick={() => onCategoryChange(item.value)}
                        className={`w-full whitespace-nowrap px-3 py-2 text-left text-sm ${
                          isActive
                            ? 'bg-point text-white'
                            : ' text-point hover:bg-point/10'
                        }`}
                      >
                        {item.label}
                      </button>
                    </SheetClose>
                  );
                })}
              </div>
              <button
                type='button'
                onClick={onLogout}
                className='mt-6 border border-point bg-blue px-4 py-2 text-sm'
              >
                로그아웃
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className='hidden lg:block'>
        <aside
          className={cn(
            'flex h-fit border bg-white p-3',
            'lg:sticky lg:top-32 lg:z-10 lg:self-start lg:min-h-[520px]',
            'flex-col justify-between',
          )}
        >
          <div className='flex-1'>
            <p className='py-2 text-lg font-semibold text-point'>카테고리</p>
            <div className='space-y-2'>
              {ADMIN_PRODUCT_CATEGORIES.map((item) => {
                const isActive = item.value === category;
                return (
                  <button
                    key={item.value}
                    type='button'
                    onClick={() => onCategoryChange(item.value)}
                    className={`w-full whitespace-nowrap px-3 py-2 text-left text-sm ${
                      isActive
                        ? 'bg-point text-white'
                        : ' text-point hover:bg-point/10'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
          <button
            type='button'
            onClick={onLogout}
            className='mb-4 mt-6 border border-point bg-blue px-4 py-2 text-sm lg:mb-0 lg:mt-12'
          >
            로그아웃
          </button>
        </aside>
      </div>
    </div>
  );
}
