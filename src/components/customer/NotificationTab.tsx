import React from 'react';
import { SubTitle } from '@/components/common';

export const NotificationTab = () => {
  return (
    <div className='wrapper'>
      <SubTitle title='공지사항' />
      <div className=''>
        <h2 className='text-base md:text-lg lg:text-xl text-dd/80'>
          등록된 공지사항이 없습니다.
        </h2>
      </div>
    </div>
  );
};
