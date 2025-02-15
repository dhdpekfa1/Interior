import Image from 'next/image';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui';
import { Product, Construction } from '@/types/sample';

interface SampleDetailProps {
  data: Product | Construction;
  category: 'product' | 'construction';
}

// 타입 가드
const isProduct = (data: Product | Construction): data is Product => {
  return 'img' in data;
};

export const SampleDetail = ({ data }: SampleDetailProps) => {
  if (isProduct(data)) {
    const productDetails = [
      { label: '제품명', value: data.name },
      { label: '브랜드', value: data.brand },
      { label: '치수(T)', value: data?.thickness },
      { label: '가로(W)', value: data?.width },
      { label: '세로(L)', value: data?.length },
      { label: '카테고리', value: data.category },
    ];

    return (
      <div className='wrapper'>
        <Table className='w-full'>
          <TableBody>
            {productDetails.map((item, index) => (
              <TableRow
                key={index}
                className='font-medium text-ef hover:bg-opacity-0'
              >
                <TableCell className='bg-ef/20'>{item.label}</TableCell>
                <TableCell className='bg-ef/40'>{item.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* 제품 이미지 */}
        <div className='flex justify-center mt-6'>
          <Image
            src={data.img}
            alt={data.name}
            width={400}
            height={400}
            className='w-full h-auto'
          />
        </div>
      </div>
    );
  }

  const constructionDetails = [
    { label: '시공 장소', value: data.location },
    { label: '제품명', value: data.product },
    { label: '카테고리', value: data.category },
  ];

  return (
    <div className='wrapper flex flex-col'>
      <Table className='w-full text-center'>
        <TableBody>
          {constructionDetails.map((item, index) => (
            <TableRow
              key={index}
              className='font-medium text-ef hover:bg-opacity-0'
            >
              <TableCell className='bg-ef/20'>{item.label}</TableCell>
              <TableCell className='bg-ef/40'>{item.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 시공 이미지 목록 */}
      <div className='flex flex-col gap-4 md:gap-8 mt-6'>
        {data.images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`시공 이미지 ${index + 1}`}
            width={400}
            height={400}
            className='w-full h-auto'
          />
        ))}
      </div>
    </div>
  );
};
