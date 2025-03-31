export interface CompanyInfoType {
  label: string;
  content: string;
  link?: string;
}

// TODO: // 변경 완료 다른 부분 확인 필요
export const CompanyInfo: CompanyInfoType[] = [
  { label: '회사명', content: '㈜YD인더스트리' }, //
  { label: '대표이사', content: '송영관' },
  {
    label: '주소',
    content: '인천광역시 서구 가정로 88번길 13 2층', //
    link: 'https://map.kakao.com/?map_type=TYPE_MAP&target=car&rt=%2C%2C523953%2C1084098&rt1=&rt2=%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%8C%90%EA%B5%90%EC%98%A4%ED%94%BC%EC%8A%A4&rtIds=%2C&rtTypes=%2C',
  },
  {
    label: 'E-mail',
    content: 'decovalley@naver.com',
    link: 'mailto:decovalley@naver.com}',
  },
  { label: 'TEL', content: '032-472-3661 ', link: 'tel:032-472-3661' }, //
  { label: 'FAX', content: '032-714-3662' }, //
  { label: '사업자 번호', content: '142-81-12527' },
  { label: '계좌번호', content: '000-000000-000' },
];
