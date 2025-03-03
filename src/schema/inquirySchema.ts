import { z } from 'zod';

export type InquiryFormType = z.infer<typeof inquirySchema>;

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

export const emailDomains = [
  'naver.com',
  'gmail.com',
  'daum.net',
  'nate.com',
  'yahoo.com',
  'kakao.com',
  '직접 입력',
];

export const inquirySchema = z.object({
  category: z.string().min(1, { message: '문의 유형을 선택해주세요.' }),
  email: z.string().email({ message: '올바른 이메일 주소를 입력하세요.' }),
  emailDomain: z.string().optional(),
  phone: z
    .string()
    .max(13)
    .regex(/^010-\d{4}-\d{4}$/, { message: '전화번호 형식: 010-1234-5678' }),
  message: z
    .string()
    .min(10, { message: '문의 내용은 최소 10자 이상 입력해주세요.' }),
  agree: z.literal(true, {
    errorMap: () => ({ message: '개인정보 수집 및 이용목적에 동의해주세요.' }),
  }),
});
