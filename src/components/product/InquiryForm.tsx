'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckedState } from '@radix-ui/react-checkbox';
import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Checkbox,
} from '@/components/ui';
import {
  inquirySchema,
  categoryList,
  InquiryFormType,
  emailDomains,
} from '@/schema/inquirySchema';
import { useInquiryForm } from '@/hooks/useInquiryForm';

export const InquiryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<InquiryFormType>({
    resolver: zodResolver(inquirySchema),
  });

  const {
    selectedDomain,
    loading,
    success,
    error,
    handleEmailChange,
    handleDomainChange,
    handlePhoneChange,
    onSubmit,
  } = useInquiryForm(setValue, watch, reset);

  const inputStyle =
    'w-full border p-2 rounded text-three text-xs sm:text-sm md:text-base';
  const errorStyle = 'text-[10px] sm:text-xs md:text-sm text-red-500';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      {/* 유형 선택 */}
      <div className='flex flex-col space-y-1.5 w-1/2 lg:w-1/3'>
        <Label htmlFor='category'>문의 유형</Label>
        <Select
          {...register('category', {
            required: '문의 유형을 선택해주세요.',
          })}
          onValueChange={(value) =>
            setValue('category', value, { shouldValidate: true })
          }
        >
          <SelectTrigger className='text-xs sm:text-sm md:text-base'>
            <SelectValue placeholder='선택하기' />
          </SelectTrigger>
          <SelectContent
            position='popper'
            side='bottom'
            className='bg-point/90 text-ef z-50 text-xs sm:text-sm md:text-base'
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
            {...register('email')}
            value={watch('email')?.split('@')[0] || ''}
            onChange={handleEmailChange}
            placeholder='이메일을 입력해주세요.'
            className={inputStyle}
          />
          @
          {selectedDomain === '직접 입력' ? (
            <Input
              type='text'
              value={watch('email').split('@')[1] || ''}
              onChange={(e) =>
                setValue(
                  'email',
                  `${watch('email').split('@')[0]}@${e.target.value}`
                )
              }
              placeholder='직접 입력'
              className={inputStyle}
            />
          ) : (
            <Select onValueChange={handleDomainChange}>
              <SelectTrigger className='text-xs sm:text-sm md:text-base'>
                <SelectValue placeholder='선택하기' />
              </SelectTrigger>
              <SelectContent
                position='popper'
                side='bottom'
                className='bg-point/90 text-ef z-50 text-xs sm:text-sm md:text-base'
              >
                {emailDomains.map((domain) => (
                  <SelectItem key={domain} value={domain}>
                    {domain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        {errors.email && <p className={errorStyle}>{errors.email.message}</p>}
      </div>

      {/* 연락처 */}
      <div className='relative'>
        <Label htmlFor='tel'>휴대폰 번호</Label>
        <Input
          id='tel'
          type='tel'
          {...register('phone')}
          placeholder='전화번호를 입력해주세요.'
          className={inputStyle}
          onChange={handlePhoneChange}
        />
        {errors.phone && <p className={errorStyle}>{errors.phone.message}</p>}
      </div>

      {/* 문의 내용 */}
      <div className='flex flex-col gap-2'>
        <Label htmlFor='content'>문의 내용</Label>
        <textarea
          id='content'
          {...register('message')}
          placeholder='문의 내용을 입력하세요...'
          className='border p-2 rounded h-32 sm:h-40 text-three text-xs sm:text-sm md:text-base'
        />
        {errors.message && (
          <p className={errorStyle}>{errors.message.message}</p>
        )}
      </div>

      {/* 개인정보 수집 및 이용 동의 */}
      <div className='flex flex-col gap-2 mt-4'>
        <Label htmlFor='tel'>개인정보의 수집 및 이용목적</Label>
        <textarea
          readOnly
          className='w-full mt-2 p-2 border rounded bg-white text-[10px] sm:text-xs md:text-sm h-28 resize-none'
          // TODO: 회사명 변경
          value={`개인정보 수집, 이용 동의서
1. 개인정보 수집, 이용 기관명 : 데코밸리(주)
2. 개인정보 수집, 이용 범위와 사용목적
 - 수집, 이용 범위 : 이름, 핸드폰번호, 이메일, 회사명
 - 사용목적 : 고객 문의 답변 및 데코밸리 상품안내`}
        />
        <div className='flex items-center gap-2 mt-2'>
          <Checkbox
            id='agree'
            {...register('agree')}
            checked={watch('agree') === true}
            onCheckedChange={(checked: CheckedState) => {
              if (checked === true) {
                setValue('agree', true);
              } else {
                setValue('agree', false as never); // 타입 맞춤
              }
            }}
          />

          <label htmlFor='agree' className='text-xs sm:text-sm'>
            개인정보의 수집 및 이용목적에 동의합니다.
          </label>
        </div>
        {errors.agree && <p className={errorStyle}>{errors.agree.message}</p>}
      </div>

      {success && (
        <p className='text-point text-center text-xs sm:text-sm md:text-base'>
          문의가 정상적으로 전송되었습니다!
        </p>
      )}
      {error && (
        <p className={`${errorStyle} text-point text-center`}>{error}</p>
      )}
      <Button
        type='submit'
        className='bg-point/90 text-ef p-2 rounded text-sm sm:text-base hover:bg-point'
        disabled={loading || success}
      >
        {loading ? '전송 중...' : '문의하기'}
      </Button>
    </form>
  );
};
