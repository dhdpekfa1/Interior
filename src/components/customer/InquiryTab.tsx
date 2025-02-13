'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubTitle } from '@/components/common';
import { Button } from '@/components/ui';

const inquirySchema = z.object({
  email: z.string().email({ message: '올바른 이메일 주소를 입력하세요.' }),
  phone: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, { message: '전화번호 형식: 010-1234-5678' }),
  message: z
    .string()
    .min(10, { message: '문의 내용은 최소 10자 이상 입력해주세요.' }),
});

type InquiryForm = z.infer<typeof inquirySchema>;

export const InquiryTab = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<InquiryForm>({
    resolver: zodResolver(inquirySchema),
  });

  // 전화번호 입력 핸들러
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // 숫자만

    // 하이픈 추가 및 11자리(숫자만) 허용
    value = value.replace(
      /^(\d{0,3})(\d{0,4})(\d{0,4}).*/, // 3-4-4 패턴을 초과시 삭제
      (_, p1, p2, p3) => {
        if (p3) return `${p1}-${p2}-${p3}`;
        if (p2) return `${p1}-${p2}`;
        return p1;
      }
    );
    // React Hook Form의 상태 업데이트
    setValue('phone', value);
  };

  const onSubmit = async (formData: InquiryForm) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        reset(); // 입력 필드 초기화
      } else {
        setError('이메일 전송에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      console.error('이메일 전송 오류 확인 ==> ', err);
      setError('서버 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = 'border p-2 rounded  text-three text-sm sm:text-base';

  return (
    <div className='wrapper'>
      <SubTitle title='문의하기' />
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        {/* 이메일 */}
        <input
          type='email'
          {...register('email')}
          placeholder='이메일 주소를 입력해주세요.'
          className={inputStyle}
        />
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

        {/* 연락처 */}
        <input
          type='tel'
          {...register('phone')}
          placeholder='전화번호를 입력해주세요.'
          className={inputStyle}
          onChange={handlePhoneChange}
        />
        {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}

        {/* 문의 내용 */}
        <textarea
          {...register('message')}
          placeholder='문의 내용을 입력하세요...'
          className='border p-2 rounded h-32 sm:h-40 text-three text-sm sm:text-base'
        />
        {errors.message && (
          <p className='text-red-500'>{errors.message.message}</p>
        )}

        {/* 제출 버튼 */}
        <Button
          type='submit'
          className='bg-second/90 text-ef p-2 rounded text-sm sm:text-base hover:bg-blue hover:text-three'
          disabled={loading}
        >
          {loading ? '전송 중...' : '문의하기'}
        </Button>

        {/* 성공 메시지 */}
        {success && (
          <p className='text-green-600'>문의가 정상적으로 전송되었습니다!</p>
        )}

        {/* 에러 메시지 */}
        {error && <p className='text-red-600'>{error}</p>}
      </form>
    </div>
  );
};
