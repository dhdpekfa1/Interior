'use client';

import React, { useState } from 'react';
import { Button, Input, Label } from '@/components/ui';
import { CompanyInfoType } from '@/types/frame';

const CompanyInfo = ({ data }: { data: CompanyInfoType[] }) => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoType[]>(data);

  const handleInputChange = (index: number, value: string) => {
    const updatedCompanyInfo = [...companyInfo];
    updatedCompanyInfo[index].content = value;
    setCompanyInfo(updatedCompanyInfo);
  };

  const handleSubmit = () => {
    console.log('TODO: 저장 이벤트');
  };
  return (
    <>
      <div className='w-full space-y-6'>
        {companyInfo.map((item, index) => (
          <div key={item.label} className='flex items-center justify-center'>
            <Label className='font-semibold w-24'>{item.label}</Label>
            <Input
              type='text'
              value={item.content}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className='input-style'
            />
          </div>
        ))}
      </div>

      <div className='mt-12 w-full flex items-center justify-center'>
        <Button
          className='bg-point/90 hover:bg-point w-[70%]'
          onClick={handleSubmit}
        >
          저장
        </Button>
      </div>
    </>
  );
};

export { CompanyInfo };
