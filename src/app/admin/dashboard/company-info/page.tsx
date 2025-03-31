'use client';
import React, { useState } from 'react';
import { SubTitle } from '@/components/common';
import { CompanyInfo } from '@/assets/companyInfo';
import { Button, Input, Label } from '@/components/ui';

const AdminCompanyInfoPage = () => {
  const [companyInfo, setCompanyInfo] = useState(CompanyInfo);

  const handleInputChange = (index: number, value: string) => {
    const updatedCompanyInfo = [...companyInfo];
    updatedCompanyInfo[index].content = value;
    setCompanyInfo(updatedCompanyInfo);
  };

  const handleSubmit = () => {
    console.log('TODO: 저장 이벤트');
  };

  return (
    <div className='wrapper flex flex-col justify-center w-full'>
      <SubTitle title='회사 정보' />
      <div className='flex items-center justify-between my-4 w-full'></div>
      {/* 회사 정보 인풋 */}
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
    </div>
  );
};

export default AdminCompanyInfoPage;
