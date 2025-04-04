import { SubTitle } from '@/components/common';
import { getCompanyInfo } from '@/app/api/companyInfo';
import { CompanyInfo } from '@/components/admin';

const AdminCompanyInfoPage = async () => {
  const companyInfo = await getCompanyInfo();

  return (
    <div className='wrapper flex flex-col justify-center w-full'>
      <SubTitle title='회사 정보' />
      <div className='flex items-center justify-between my-4 w-full'></div>
      {/* 회사 정보 인풋 */}
      <CompanyInfo data={companyInfo} />
    </div>
  );
};

export default AdminCompanyInfoPage;
