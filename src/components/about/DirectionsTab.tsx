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
import { CompanyInfo } from '@/assets/companyInfo';
import { cn } from '@/lib/utils';

// TODO: 정보 수정 후 분리
export const busInfo = [
  {
    type: '일반',
    color: 'bg-green-500',
    buses: '25, 25-2, 27, 36, 55',
  },
  { type: '일반', color: 'bg-green-500', buses: '310, 777' },
  { type: '직행', color: 'bg-red-500', buses: '2007, 3000, 7770' },
  { type: '좌석', color: 'bg-sky-600', buses: '300, 900' },
];

export const subwayInfo = [
  '택시로 10분',
  '37번 - 수성중 사거리 하차 후 도보 3분',
  '1번, 5번 - 수성중 사거리 하차 후 도보 3분',
];

export const DirectionsTab = () => {
  const contact = CompanyInfo.filter((item) =>
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
              <p className='text-base sm:text-sm md:text-lg font-bold text-white'>
                {item.label}
              </p>
              <Separator className='w-[90%]' />
              {item.link ? (
                <a
                  href={item.link}
                  target={item.label === '주소' ? '_blank' : '_self'}
                  rel='noopener noreferrer'
                  className='text-base md:text-lg font-bold text-white hover:underline text-center break-keep'
                >
                  {item.content}
                </a>
              ) : (
                <p className='text-base md:text-lg font-bold text-white break-keep'>
                  {item.content}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className='flex gap-5 w-full flex-col md:flex-row'>
          <Card className='w-full'>
            <CardHeader>
              <CardTitle className='text-base md:text-xl'>
                버스 이용 시
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='flex flex-col gap-3 text-xs md:text-base'>
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
              <CardTitle className='text-base md:text-xl'>
                지하철 이용시
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h1 className='text-base md:text-xl font-bold mb-2 relative z-0'>
                <div className='absolute bottom-0 left-0 w-full h-1/2 bg-point/50 -z-10' />
                화서역 하차
              </h1>
              <ul className='mt-3 flex flex-col gap-2 text-xs sm:text-sm md:text-base'>
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
