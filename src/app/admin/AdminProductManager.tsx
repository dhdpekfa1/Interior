'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { ADMIN_PRODUCT_CATEGORIES } from '@/lib/admin-product';
import { Product } from '@/types/sample';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Pagination } from '@/components/common';
import {
  ProductFormState,
  AdminProductCard,
  AddProductModal,
  AdminCategorySidebar,
} from '@/app/admin/components';

const INITIAL_FORM: ProductFormState = {
  name: '',
  image: '',
  description: '',
};

const sanitizeImageUrl = (raw: string): string => {
  const trimmed = raw.trim();
  const matchedUrl = trimmed.match(/https?:\/\/[^\s\]]+/i);
  return (matchedUrl?.[0] ?? trimmed).trim();
};
const ITEMS_PER_PAGE = 16;

export default function AdminProductManager() {
  const router = useRouter();
  const [category, setCategory] = useState<string>(
    ADMIN_PRODUCT_CATEGORIES[0].value,
  );
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createFormVersion, setCreateFormVersion] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/products?category=${category}`);
      const json = await response.json();
      if (!response.ok) throw new Error(json.error ?? '목록 조회 실패');
      setItems(json.items ?? []);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : '목록 조회 중 오류가 발생했습니다.',
      );
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    setEditingId(null);
    setCurrentPage(1);
    fetchItems();
  }, [category, fetchItems]);

  const filteredItems = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) return items;
    return items.filter((item) => item.name.toLowerCase().includes(keyword));
  }, [items, searchQuery]);

  useEffect(() => {
    const totalPages = Math.max(
      1,
      Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
    );
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredItems.length, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const onSubmitCreate = async (
    targetCategory: string,
    values: ProductFormState,
  ) => {
    setSaving(true);
    setError('');

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: targetCategory,
          ...values,
          image: sanitizeImageUrl(values.image),
        }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error ?? '저장 실패');

      setCreateFormVersion((prev) => prev + 1);
      setCreateModalOpen(false);
      if (targetCategory === category) {
        await fetchItems();
      } else {
        setCategory(targetCategory);
      }
      toast.success('상품을 등록했습니다.');
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : '저장 중 오류가 발생했습니다.',
      );
      toast.error('상품 등록에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (item: Product) => {
    setEditingId(item.id);
  };

  const resetEditForm = () => {
    setEditingId(null);
  };

  const onSubmitEdit = async (id: string, values: ProductFormState) => {
    setUpdating(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          ...values,
          image: sanitizeImageUrl(values.image),
        }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error ?? '수정 실패');

      resetEditForm();
      await fetchItems();
      toast.success('상품을 수정했습니다.');
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : '수정 중 오류가 발생했습니다.',
      );
      toast.error('상품 수정에 실패했습니다.');
    } finally {
      setUpdating(false);
    }
  };

  const onDelete = async (id: string) => {
    const confirmed = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmed) return;

    setError('');
    setDeletingId(id);
    try {
      const response = await fetch(
        `/api/admin/products/${id}?category=${category}`,
        {
          method: 'DELETE',
        },
      );
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error ?? '삭제 실패');
      }

      if (editingId === id) resetEditForm();
      await fetchItems();
      toast.success('상품을 삭제했습니다.');
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : '상품 삭제 중 오류가 발생했습니다.',
      );
      toast.error('상품 삭제에 실패했습니다.');
    } finally {
      setDeletingId(null);
    }
  };

  const onLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace('/admin/login');
    router.refresh();
  };

  const totalItems = filteredItems.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <main
      className={cn(
        'relative p-16 md:p-20',
        'flex flex-col gap-4 md:gap-8 min-h-screen',
      )}
    >
      <header className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h1 className='text-3xl font-bold'>상품 관리</h1>
          <p className='mt-1 text-sm text-gray-600'>
            카테고리별 상품을 등록/수정/삭제할 수 있습니다.
          </p>
        </div>
      </header>

      <section className='grid gap-4 lg:grid-cols-[180px_1fr]'>
        <AdminCategorySidebar
          category={category}
          sidebarOpen={sidebarOpen}
          onSidebarOpenChange={setSidebarOpen}
          onCategoryChange={setCategory}
          onLogout={onLogout}
        />
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>상품 목록</h2>
            <div className='flex items-center gap-2'>
              <input
                type='text'
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder='상품명 검색'
                className='border px-3 py-2 text-sm'
                aria-label='상품명 검색'
              />
              <AddProductModal
                open={createModalOpen}
                onOpenChange={setCreateModalOpen}
                formVersion={createFormVersion}
                initialValues={INITIAL_FORM}
                currentCategory={category}
                isSubmitting={saving}
                onSubmit={onSubmitCreate}
              />
            </div>
          </div>

          {error && <p className='text-sm text-red-600'>{error}</p>}
          {loading ? (
            <div className='flex items-center justify-center h-full'>
              <Loader2 className='size-12 animate-spin text-point' />
            </div>
          ) : (
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4'>
              {totalItems === 0 && (
                <p className='col-span-full border p-4 text-sm text-gray-600'>
                  검색 결과가 없습니다.
                </p>
              )}

              {paginatedItems.map((item) => {
                const isEditing = editingId === item.id;
                const imageSrc = sanitizeImageUrl(item.image ?? '');
                return (
                  <AdminProductCard
                    key={item.id}
                    item={item}
                    imageSrc={imageSrc}
                    isEditing={isEditing}
                    isDeleting={deletingId === item.id}
                    isUpdating={updating && isEditing}
                    onStartEdit={startEdit}
                    onDelete={onDelete}
                    onSubmitEdit={onSubmitEdit}
                    onCancelEdit={resetEditForm}
                  />
                );
              })}
            </div>
          )}
          {totalItems > ITEMS_PER_PAGE && (
            <div className='mt-6'>
              <Pagination
                currentPage={currentPage}
                total={totalItems}
                limit={ITEMS_PER_PAGE}
                showPages={5}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
