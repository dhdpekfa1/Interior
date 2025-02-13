'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubTitle } from '@/components/common';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
} from '@/components/ui';
import { inquirySchema, categoryList } from '@/schema/inquiry';

type InquiryForm = z.infer<typeof inquirySchema>;

const emailDomains = [
  'naver.com',
  'gmail.com',
  'daum.net',
  'nate.com',
  'yahoo.com',
  'kakao.com',
  '직접 입력',
];

export const InquiryTab = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [customEmail, setCustomEmail] = useState(''); // 직접 입력한 이메일
  const [emailId, setEmailId] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<InquiryForm>({
    resolver: zodResolver(inquirySchema),
  });

  // 선택된 도메인 값 추적
  const selectedDomain = watch('emailDomain') || '';

  // 이메일 입력 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailId(e.target.value);
    setValue(
      'email',
      `${e.target.value}${
        selectedDomain !== '직접 입력' ? '@' + selectedDomain : ''
      }`
    );
  };

  // 이메일 도메인 선택 핸들러
  const handleDomainChange = (value: string) => {
    setValue('emailDomain', value);

    if (value === '직접 입력') {
      setCustomEmail('');
    } else {
      setValue('email', `${emailId}@${value}`);
    }
  };

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

    // 선택된 카테고리의 label 찾기
    const selectedCategory = categoryList.find(
      (item) => item.value === formData.category
    );
    const categoryLabel = selectedCategory ? selectedCategory.label : '기타';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, categoryLabel }),
      });

      if (res.ok) {
        setSuccess(true);
        reset(); // 입력 필드 초기화
        setEmailId('');
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

  const inputStyle =
    'w-full border p-2 rounded text-three text-xs sm:text-sm md:text-base';
  const errorStyle = 'text-[10px] sm:text-xs md:text-sm text-red-500';

  return (
    <div className='wrapper'>
      <SubTitle title='문의하기' />
      <div className='flex items center justify-center'>
        <Card className='w-[95%] sm:w-[80%] md:w-2/3 lg:w-[60%]'>
          <CardHeader>
            <CardTitle className='text-lg sm:text-xl md:text-2xl'>
              문의하기
            </CardTitle>
            <CardDescription className='text-xs sm:text-sm'>
              당신의 공간을 더욱 특별하게! 궁금한 점을 남겨주세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-4'
            >
              <div className='flex flex-col space-y-1.5 w-1/2 lg:w-1/3'>
                <Label htmlFor='category'>문의 유형</Label>
                <Select
                  aria-labelledby='category'
                  onValueChange={(value) => setValue('category', value)}
                >
                  <SelectTrigger id='category'>
                    <SelectValue placeholder='선택하기' />
                  </SelectTrigger>
                  <SelectContent
                    position='popper'
                    className='bg-point/90 text-ef z-10'
                  >
                    {categoryList.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className={errorStyle}>{errors.category.message}</p>
                )}
              </div>

              {/* 이메일 */}
              <div className='flex flex-col gap-2'>
                <Label htmlFor='email'>이메일</Label>
                <div className='flex gap-2 items-center'>
                  <Input
                    id='email'
                    type='text'
                    value={emailId}
                    onChange={handleEmailChange}
                    placeholder='이메일 입력'
                    className={inputStyle}
                  />
                  @
                  {selectedDomain === '직접 입력' && (
                    <Input
                      type='text'
                      value={customEmail}
                      onChange={(e) => {
                        setCustomEmail(e.target.value);
                        setValue('email', `${emailId}@${e.target.value}`);
                      }}
                      placeholder='직접 입력'
                      className={inputStyle}
                    />
                  )}
                  {errors.email && (
                    <p className={errorStyle}>{errors.email.message}</p>
                  )}
                  <Select onValueChange={handleDomainChange}>
                    <SelectTrigger id='emailDomain'>
                      <SelectValue placeholder='선택' />
                    </SelectTrigger>
                    <SelectContent
                      position='popper'
                      className='bg-point/90 text-ef z-10'
                    >
                      {emailDomains.map((domain) => (
                        <SelectItem key={domain} value={domain}>
                          {domain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 연락처 */}
              <div className='relative'>
                <Label htmlFor='tel'>휴대폰 번호</Label>
                <input
                  id='tel'
                  type='tel'
                  {...register('phone')}
                  placeholder='전화번호를 입력해주세요.'
                  className={inputStyle}
                  onChange={handlePhoneChange}
                />
                {errors.phone && (
                  <p className={errorStyle}>{errors.phone.message}</p>
                )}
              </div>

              {/* 문의 내용 */}
              <div className='flex flex-col gap-2'>
                <Label htmlFor='content'>문의 내용</Label>
                <textarea
                  id='content'
                  {...register('message')}
                  placeholder='문의 내용을 입력하세요...'
                  className='border p-2 rounded h-32 sm:h-40 text-three text-sm sm:text-base'
                />
                {errors.message && (
                  <p className={errorStyle}>{errors.message.message}</p>
                )}
              </div>

              <Button
                type='submit'
                className='bg-second/90 text-ef p-2 rounded text-sm sm:text-base hover:bg-blue hover:text-three'
                disabled={loading}
              >
                {loading ? '전송 중...' : '문의하기'}
              </Button>
              {success && (
                <p className='text-point text-center text-xs sm:text-sm md:text-base'>
                  문의가 정상적으로 전송되었습니다!
                </p>
              )}
              {error && (
                <p className={`${errorStyle} text-point text-center`}>
                  {error}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
