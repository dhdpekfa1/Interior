'use client';

import { useForm } from 'react-hook-form';
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
  CardFooter,
} from '@/components/ui';
import {
  inquirySchema,
  categoryList,
  InquiryFormType,
  emailDomains,
} from '@/schema/inquirySchema';
import { useInquiryForm } from '@/hooks/useInquiryForm';

export const InquiryTab = () => {
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
    <div className='wrapper'>
      <SubTitle title='문의하기' />
      <div className='flex items-center justify-center'>
        <Card className='w-[95%] sm:w-[80%] md:w-2/3 lg:w-[60%] bg-ef'>
          <CardHeader>
            <CardTitle className='text-lg sm:text-xl md:text-2xl text-point'>
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
                  <SelectContent>
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
                        className='bg-point/90 text-ef z-10 text-xs sm:text-sm md:text-base'
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
                {errors.email && (
                  <p className={errorStyle}>{errors.email.message}</p>
                )}
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
                  className='border p-2 rounded h-32 sm:h-40 text-three text-xs sm:text-sm md:text-base'
                />
                {errors.message && (
                  <p className={errorStyle}>{errors.message.message}</p>
                )}
              </div>

              <Button
                type='submit'
                className='bg-point/90 text-ef p-2 rounded text-sm sm:text-base hover:bg-point'
                disabled={loading || success}
              >
                {loading ? '전송 중...' : '문의하기'}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            {success && (
              <p className='text-point text-center text-xs sm:text-sm md:text-base'>
                문의가 정상적으로 전송되었습니다!
              </p>
            )}
            {error && (
              <p className={`${errorStyle} text-point text-center`}>{error}</p>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
