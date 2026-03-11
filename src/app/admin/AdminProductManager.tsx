'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { ADMIN_PRODUCT_CATEGORIES } from '@/lib/admin-product';
import { Product } from '@/types/sample';
import { Loader2, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import AdminProductCard, {
  ProductFormState,
} from '@/app/admin/components/AdminProductCard';

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
  const [form, setForm] = useState<ProductFormState>(INITIAL_FORM);
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
    fetchItems();
  }, [category, fetchItems]);

  const onSubmitCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          ...form,
          image: sanitizeImageUrl(form.image),
        }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error ?? '저장 실패');

      setForm(INITIAL_FORM);
      await fetchItems();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : '저장 중 오류가 발생했습니다.',
      );
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
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : '수정 중 오류가 발생했습니다.',
      );
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
        setError(json.error ?? '삭제 실패');
        return;
      }

      if (editingId === id) resetEditForm();
      await fetchItems();
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

  return (
    <main
      className={cn('relative p-16 md:p-20', 'flex flex-col gap-4 md:gap-8')}
    >
      <button
        type='button'
        onClick={() => setSidebarOpen((prev) => !prev)}
        className='fixed left-4 top-4 z-40 border bg-white p-2 text-point shadow lg:hidden'
        aria-label='카테고리 사이드바 열기/닫기'
      >
        {sidebarOpen ? <X className='size-5' /> : <Menu className='size-5' />}
      </button>

      <header className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h1 className='text-3xl font-bold'>상품 관리자</h1>
          <p className='mt-1 text-sm text-gray-600'>
            카테고리별 상품을 등록/수정/삭제할 수 있습니다.
          </p>
        </div>
        <button
          type='button'
          onClick={onLogout}
          className='border px-4 py-2 text-sm'
        >
          로그아웃
        </button>
      </header>

      <section className='border p-4'>
        <h2 className='text-lg font-semibold'>상품 등록</h2>
        <form
          className='mt-4 grid gap-3 md:grid-cols-2'
          onSubmit={onSubmitCreate}
        >
          <input
            className='border px-3 py-2'
            placeholder='상품명'
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            required
          />
          <input
            className='border px-3 py-2'
            placeholder='이미지 URL'
            value={form.image}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, image: event.target.value }))
            }
            required
          />
          <textarea
            className='min-h-28 border px-3 py-2 md:col-span-2'
            placeholder='설명'
            value={form.description}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, description: event.target.value }))
            }
          />
          <div className='flex gap-2 md:col-span-2'>
            <button
              type='submit'
              disabled={saving}
              className=' bg-black px-4 py-2 text-white disabled:opacity-50'
            >
              {saving ? (
                <Loader2 className='size-4 animate-spin text-point' />
              ) : (
                '등록'
              )}
            </button>
          </div>
        </form>
      </section>

      <section className='grid gap-4 lg:grid-cols-[180px_1fr]'>
        {sidebarOpen && (
          <button
            type='button'
            aria-label='카테고리 사이드바 닫기'
            className='fixed inset-0 z-20 bg-black/40 lg:hidden'
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={cn(
            'h-fit border bg-white p-3',
            'lg:sticky lg:top-32 lg:z-10 lg:self-start',
            'fixed left-0 top-0 z-30 h-full w-40 overflow-y-auto border-r p-4 transition-transform duration-300 lg:h-fit lg:w-auto lg:border',
            sidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0',
          )}
        >
          <p className='mb-3 px-1 text-md font-semibold text-point'>카테고리</p>
          <div className='space-y-2'>
            {ADMIN_PRODUCT_CATEGORIES.map((item) => {
              const isActive = item.value === category;
              return (
                <button
                  key={item.value}
                  type='button'
                  onClick={() => {
                    setCategory(item.value);
                    setSidebarOpen(false);
                  }}
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
        </aside>
        <div className='space-y-3'>
          <h2 className='text-lg font-semibold'>상품 목록</h2>
          {error && <p className='text-sm text-red-600'>{error}</p>}
          {loading ? (
            <div className='flex items-center justify-center h-full'>
              <Loader2 className='size-12 animate-spin text-point' />
            </div>
          ) : (
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4'>
              {items.length === 0 && (
                <p className='col-span-full border p-4 text-sm text-gray-600'>
                  등록된 상품이 없습니다.
                </p>
              )}

              {items.map((item) => {
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
        </div>
      </section>
    </main>
  );
}
