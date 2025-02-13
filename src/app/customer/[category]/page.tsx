import { InquiryTab, NotificationTab } from '@/components/customer';
import { UrlTabs } from '@/components/common';

const CUSTOMER_TABS = [
  { label: '공지사항', value: 'notification', component: <NotificationTab /> },
  { label: '문의하기', value: 'inquiry', component: <InquiryTab /> },
];

const CustomerPage = () => {
  return (
    <div className='container'>
      <UrlTabs
        title='고객지원'
        basePath='/customer'
        defaultTab='notification'
        tabs={CUSTOMER_TABS}
      />
    </div>
  );
};

export default CustomerPage;
