'use client';

import { useParams, notFound } from 'next/navigation';
import { SampleDetail, SubTitle } from '@/components/common';
import constructionData from '@/assets/mock/mockConstruction.json';

const ConstructionDetailPage = () => {
  const { id } = useParams();
  const construction = constructionData.find((p) => p.id.toString() === id);

  if (!construction) {
    notFound(); // 404 페이지로 이동
  }

  return (
    <div className='container'>
      <div className='wrapper'>
        <SubTitle title='데코타일' />
        <SampleDetail data={construction} category='construction' />
      </div>
    </div>
  );
};

export default ConstructionDetailPage;
