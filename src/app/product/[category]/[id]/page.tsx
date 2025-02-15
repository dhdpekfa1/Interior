'use client';

import { useParams, notFound } from 'next/navigation';
import { SampleDetail, SubTitle } from '@/components/common';
import constructionData from '@/assets/mock/mockProduct.json';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = constructionData.find((p) => p.id.toString() === id);

  if (!product) {
    notFound(); // 404 페이지로 이동
  }

  return (
    <div className='container'>
      <div className='wrapper'>
        <SubTitle title='데코타일' />
        <SampleDetail data={product} category='product' />
      </div>
    </div>
  );
};

export default ProductDetailPage;
