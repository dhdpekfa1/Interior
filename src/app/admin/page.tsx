'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      router.push('/admin/dashboard');
    } else {
      setError('비밀번호가 틀렸습니다.');
    }
    console.log('env ==> ', process.env.NEXT_PUBLIC_ADMIN_PASSWORD);
    console.log('입력 ==> ', password);
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='text-2xl md:text-3xl text-ef font-bold'>관리자 로그인</h1>
      <div>
        <input
          type='password'
          placeholder='비밀번호 입력'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='input-style'
        />
      </div>
      <button
        onClick={handleLogin}
        className='bg-point text-ef p-2 text-xs sm:text-sm md:text-base rounded'
      >
        로그인
      </button>
      {error && <p className='error-style'>{error}</p>}
    </div>
  );
};
export default AdminPage;
