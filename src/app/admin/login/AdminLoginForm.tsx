'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const loginSchema = z.object({
  email: z.string().email('이메일 형식이 올바르지 않습니다.'),
  password: z.string().min(5, '정확한 비밀번호를 입력해주세요.'),
});
type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    clearErrors('root.server');

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (signInError) {
      setError('root.server', {
        type: 'server',
        message:
          '로그인에 실패했습니다. 계정 정보 또는 관리자 권한을 확인해주세요.',
      });
      return;
    }

    router.replace('/admin');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='space-y-1'>
        <label className='text-sm text-gray-700'>이메일</label>
        <input
          className='w-full rounded-md border px-3 py-2'
          type='email'
          placeholder='admin@yourdomain.com'
          autoComplete='email'
          {...register('email')}
        />
        {errors.email && (
          <p className='text-xs text-red-600'>{errors.email.message}</p>
        )}
      </div>
      <div className='space-y-1'>
        <label className='text-sm text-gray-700'>비밀번호</label>
        <input
          className='w-full rounded-md border px-3 py-2'
          type='password'
          placeholder='********'
          autoComplete='current-password'
          {...register('password')}
        />
        {errors.password && (
          <p className='text-xs text-red-600'>{errors.password.message}</p>
        )}
      </div>
      {errors.root?.server?.message && (
        <p className='text-sm text-red-600'>{errors.root.server.message}</p>
      )}
      <button
        type='submit'
        disabled={isSubmitting}
        className={cn(
          'w-full h-10 bg-point/90 text-ef p-2 text-sm sm:text-base hover:bg-point',
          'flex items-center justify-center',
          isSubmitting && 'opacity-50',
        )}
      >
        {isSubmitting ? (
          <Loader2 className='size-4 animate-spin text-second' />
        ) : (
          '관리자 로그인'
        )}
      </button>
    </form>
  );
}
