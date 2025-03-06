import { Banner } from '@/components/common';
import { InquiryTab } from '@/components/customer';

const CustomerPage = () => {
  return (
    <>
      <Banner
        title='문의접수'
        description='고객과의 소통을 통해 더 나은 가치를 만들어갑니다'
        imgUrl='https://images.unsplash.com/photo-1636574879131-5f3cd5c8a8e1?q=80&w=2239&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      />
      <div className='container'>
        <InquiryTab />
      </div>
    </>
  );
};

export default CustomerPage;
