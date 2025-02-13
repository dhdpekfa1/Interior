'use client';

import { useState } from 'react';
import { SubTitle } from '@/components/common';

export const InquiryTab = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setFormData({ email: '', phone: '', message: '' });
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

  return (
    <div className='wrapper'>
      <SubTitle title='문의하기' />
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          name='email'
          placeholder='이메일 주소'
          value={formData.email}
          onChange={handleChange}
          required
          className='border p-2 rounded'
        />
        <input
          type='tel'
          name='phone'
          placeholder='연락처'
          value={formData.phone}
          onChange={handleChange}
          required
          className='border p-2 rounded'
        />
        <textarea
          name='message'
          placeholder='문의 내용을 입력하세요...'
          value={formData.message}
          onChange={handleChange}
          required
          className='border p-2 rounded'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded'
          disabled={loading}
        >
          {loading ? '전송 중...' : '문의하기'}
        </button>
        {success && (
          <p className='text-green-600'>문의가 정상적으로 전송되었습니다!</p>
        )}
        {error && <p className='text-red-600'>{error}</p>}
      </form>
    </div>
  );
};
