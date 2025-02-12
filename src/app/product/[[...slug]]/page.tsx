import {
  SubTabs,
  SubTabsList,
  SubTabsTrigger,
  SubTabsContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui';
import { menuData } from '@/assets/data';

const ProductPage = () => {
  const data = menuData.find((data) => data.title === '제품소개');
  const subData = data?.menuTitle;

  if (!data || !data.subMenu) {
    return <div>데이터가 없습니다.</div>;
  }
  console.log(data);
  return (
    <div className='container'>
      <Tabs defaultValue='account' className='w-[400px]'>
        <TabsList>
          {data.subMenu.map((item) => (
            <TabsTrigger key={item.label} value={item.label}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value='account'>
          Make changes to your account here.
        </TabsContent>
        <TabsContent value='password'>Change your password here.</TabsContent>
      </Tabs>
      <SubTabs defaultValue='account' className='w-[400px]'>
        <SubTabsList>
          {subData &&
            subData.map((title) => (
              <SubTabsTrigger key={title} value={title}>
                {title}
              </SubTabsTrigger>
            ))}
        </SubTabsList>
        <SubTabsContent value='account'>
          Make changes to your account here.
        </SubTabsContent>
        <SubTabsContent value='password'>
          Change your password here.
        </SubTabsContent>
      </SubTabs>
    </div>
  );
};

export default ProductPage;
