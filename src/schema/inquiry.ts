import { z } from 'zod';

export const inquirySchema = z.object({
  email: z.string().email({ message: '올바른 이메일 주소를 입력하세요.' }),
  phone: z
    .string()
    .max(13)
    .regex(/^010-\d{4}-\d{4}$/, { message: '전화번호 형식: 010-1234-5678' }),

  message: z
    .string()
    .min(10, { message: '문의 내용은 최소 10자 이상 입력해주세요.' }),
});
