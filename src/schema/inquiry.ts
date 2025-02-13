import { z } from 'zod';

export const categoryList = [
  { value: 'estimate', label: '견적 문의' },
  { value: 'schedule', label: '시공 일정 문의' },
  { value: 'materials', label: '자재 관련 문의' },
  { value: 'design', label: '디자인 및 설계 문의' },
  { value: 'warranty', label: 'A/S 및 보증 문의' },
  { value: 'contract', label: '계약 및 결제 문의' },
  { value: 'progress', label: '시공 진행 상황 문의' },
  { value: 'issue', label: '문제 발생 및 클레임' },
  { value: 'etc', label: '기타 문의' },
];

export const inquirySchema = z.object({
  category: z.enum(
    categoryList.map((item) => item.value) as [string, ...string[]],
    {
      message: '문의 유형을 선택해주세요.',
    }
  ),

  email: z.string().email({ message: '올바른 이메일 주소를 입력하세요.' }),
  phone: z
    .string()
    .max(13)
    .regex(/^010-\d{4}-\d{4}$/, { message: '전화번호 형식: 010-1234-5678' }),

  message: z
    .string()
    .min(10, { message: '문의 내용은 최소 10자 이상 입력해주세요.' }),
});
