'use client';

import { SubTitle } from '@/components/common';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { InquiryForm } from '../product/InquiryForm';

export const InquiryTab = () => {
  return (
    <div className='wrapper'>
      <SubTitle title='문의접수' />
      <div className='flex items-center justify-center'>
        <Card className='w-[95%] sm:w-[80%] md:w-2/3 lg:w-[60%] bg-white'>
          <CardHeader>
            <CardTitle className='text-lg sm:text-xl md:text-2xl text-point'>
              문의접수
            </CardTitle>
            <CardDescription className='text-xs sm:text-sm'>
              당신의 공간을 더욱 특별하게! 궁금한 점을 남겨주세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InquiryForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
