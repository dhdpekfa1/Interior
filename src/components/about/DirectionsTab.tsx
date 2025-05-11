import { SubTitle } from '@/components/common';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from '@/components/ui';
import { ChevronRight } from 'lucide-react';
import { KakaoMap } from '@/components/common/KakaoMap';
import { cn } from '@/lib/utils';
import companyInfo from '@/assets/data/companyInfo.json';

const busInfo = [
  { type: '간선', color: 'bg-sky-600', buses: '12, 13, 7, 103' },
];
const subwayInfo = ['택시 5분', '도보 10분'];

export const DirectionsTab = async () => {
  const contact = companyInfo.filter((item) =>
    ['주소', 'TEL', 'FAX'].includes(item.label)
  );

  return (
    <div className='wrapper'>
      <SubTitle title='오시는 길' />

      {/* 지도 */}
      <KakaoMap />
      <Separator className='my-4' />

      <div className='flex flex-col gap-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-4'>
          {contact.map((item) => (
            <div
              key={item.label}
              className='flex flex-col items-center gap-3 bg-point p-3 w-full h-full'
            >
              <p className='text-base sm:text-sm md:text-lg font-medium text-white'>
                {item.label}
              </p>
              <Separator className='w-[90%]' />
              {item.link ? (
                <a
                  href={item.link}
                  target={item.label === '주소' ? '_blank' : '_self'}
                  rel='noopener noreferrer'
                  className='text-base md:text-lg font-medium text-white hover:underline text-center break-keep'
                >
                  {item.content}
                </a>
              ) : (
                <p className='text-base md:text-lg font-medium text-white break-keep'>
                  {item.content}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className='flex gap-4 w-full flex-col sm:flex-row'>
          <Card className='w-full'>
            <CardHeader>
              <CardTitle className='text-base md:text-lg'>
                버스 이용 시
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='flex flex-col gap-2 text-xs md:text-base'>
                {busInfo.map((bus, index) => (
                  <li key={index} className='flex items-center gap-3'>
                    <Button
                      className={cn(
                        `${bus.color} border-none hover:${bus.color}`,
                        'h-fit w-fit px-2 py-1 text-xs font-medium flex justify-center items-center'
                      )}
                    >
                      {bus.type}
                    </Button>
                    {bus.buses}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className='w-full'>
            <CardHeader>
              <CardTitle className='text-base md:text-lg'>
                지하철 이용시
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h1 className='w-fit font-medium mb-2 relative z-0'>
                <div className='absolute bottom-0 left-0 w-full h-1/2 bg-point/60 -z-10' />
                인천 2호선 가좌역 하차
              </h1>
              <ul className='mt-2 flex flex-col gap-1 text-xs sm:text-sm md:text-base'>
                {subwayInfo.map((info, index) => (
                  <li key={index} className='flex items-center gap-2'>
                    <ChevronRight className='w-4 md:w-5 mt-1 shrink-0 flex-none' />
                    <span className='text-sm md:text-base'>{info}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
