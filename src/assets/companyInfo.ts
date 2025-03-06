export interface CompanyInfoType {
  label: string;
  content: string;
  link?: string;
}

// TODO: 정보 받으면 변경
export const CompanyInfo: CompanyInfoType[] = [
  { label: '회사명', content: 'YD-Industry' },
  { label: '대표이사', content: '송영관' },
  {
    label: '주소',
    content: '경기도 평택시 청북읍 드림산단7로 36',
    link: 'https://map.kakao.com/?map_type=TYPE_MAP&target=car&rt=%2C%2C523953%2C1084098&rt1=&rt2=%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%8C%90%EA%B5%90%EC%98%A4%ED%94%BC%EC%8A%A4&rtIds=%2C&rtTypes=%2C',
  },
  {
    label: 'E-mail',
    content: 'decovalley@naver.com',
    link: 'mailto:decovalley@naver.com}',
  },
  { label: 'TEL', content: '031-334-6771~2', link: 'tel:031-334-6771' },
  { label: 'FAX', content: '031-334-6773' },
  { label: '사업자 번호', content: '142-81-12527' },
  { label: '계좌번호', content: '000-000000-000' },
];
