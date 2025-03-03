import { useState } from 'react';
import { UseFormSetValue, UseFormWatch, UseFormReset } from 'react-hook-form';
import { InquiryFormType, categoryList } from '@/schema/inquirySchema';
import { useProductStore } from '@/store/useProductStore';

export const useInquiryForm = (
  setValue: UseFormSetValue<InquiryFormType>,
  watch: UseFormWatch<InquiryFormType>,
  reset: UseFormReset<InquiryFormType>
) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { selectedProducts, reset: resetProducts } = useProductStore();

  // 선택된 이메일 도메인 추적
  const selectedDomain = watch('emailDomain') || '';

  // 이메일 입력 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const emailId = watch('email').split('@')[0] || '';

    if (value !== '직접 입력') {
      setValue('email', `${emailId}@${value}`);
    }
  };

  // 전화번호 입력 핸들러 (숫자만 허용 + 자동 하이픈 추가)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    value = value.replace(/^(\d{0,3})(\d{0,4})(\d{0,4}).*/, (_, p1, p2, p3) => {
      if (p3) return `${p1}-${p2}-${p3}`;
      if (p2) return `${p1}-${p2}`;
      return p1;
    });

    setValue('phone', value);
  };

  // 폼 제출 핸들러
  const onSubmit = async (formData: InquiryFormType) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    const selectedCategory = categoryList.find(
      (item) => item.value === formData.category
    );
    const categoryLabel = selectedCategory ? selectedCategory.label : '기타';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          categoryLabel,
          products: selectedProducts,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        reset(); // 폼 초기화
        resetProducts(); // 선택 제품 초기화
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

  return {
    selectedDomain,
    loading,
    success,
    error,
    setError,
    setSuccess,
    setLoading,
    handleEmailChange,
    handleDomainChange,
    handlePhoneChange,
    onSubmit,
  };
};
