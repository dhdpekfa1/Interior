interface SubMenuItem {
  label: string;
  url: string;
  img?: string;
  description?: string;
}

interface MenuItem {
  title: string;
  baseUrl: string;
  subMenu: SubMenuItem[];
  menuTitle?: string[];
}

// TODO: 이미지 변경
export const menuData: MenuItem[] = [
  {
    title: '회사소개',
    baseUrl: '/about/us',
    subMenu: [
      { label: '회사소개', url: '/about/us' },
      { label: '오시는 길', url: '/about/directions' },
    ],
  },
  {
    title: '제품소개',
    baseUrl: '/product/deco',
    subMenu: [
      {
        label: '데코타일',
        url: '/product/deco',
        description: '세련된 디자인과 뛰어난 내구성을 갖춘 고급 바닥재',
        img: 'https://images.unsplash.com/photo-1599209250635-26c180f28419?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        label: '우드타일',
        url: '/product/wood',
        description: '자연스러운 나무 질감을 그대로 담은 우드 스타일 타일',
        img: 'https://images.unsplash.com/photo-1594341715655-c695ba36ccd9?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        label: '카펫타일',
        url: '/product/carpet-tiles',
        description: '편안함과 실용성을 더한 모던한 카펫타일',
        img: 'https://images.unsplash.com/photo-1676474987690-2fc0582a07ec?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        label: '카페트',
        url: '/product/carpet',
        description: '아늑한 공간을 완성하는 고급스러운 카페트',
        img: 'https://images.unsplash.com/photo-1444362408440-274ecb6fc730?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        label: '디럭스타일',
        url: '/product/deluxe',
        description: '차별화된 품격을 더하는 프리미엄 바닥재',
        img: 'https://images.unsplash.com/photo-1580398562556-d33329a0f29b?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
  // {
  //   title: '시공사례',
  //   baseUrl: '/construction',
  //   subMenu: [
  //     {
  //       label: '데코타일',
  //       url: '/construction/deco',
  //       img: 'https://plus.unsplash.com/premium_photo-1732776567082-cbcd94f49316?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     },
  //     {
  //       label: '우드타일',
  //       url: '/construction/wood',
  //       img: 'https://images.unsplash.com/photo-1594341715655-c695ba36ccd9?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     },
  //     {
  //       label: '카펫타일',
  //       url: '/construction/carpet-tiles',
  //       img: 'https://images.unsplash.com/photo-1676474987690-2fc0582a07ec?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     },
  //     {
  //       label: '카페트',
  //       url: '/construction/carpet',
  //       img: 'https://images.unsplash.com/photo-1444362408440-274ecb6fc730?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     },
  //     {
  //       label: '디럭스타일',
  //       url: '/construction/deluxe',
  //       img: 'https://images.unsplash.com/photo-1580398562556-d33329a0f29b?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     },
  //     {
  //       label: '수평몰탈',
  //       url: '/construction/self',
  //       img: 'https://images.unsplash.com/photo-1454694220579-9d6672b1ec2a?q=80&w=2185&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     },
  //   ],
  // },
  {
    title: '고객지원',
    baseUrl: '/customer',
    subMenu: [
      // { label: '공지사항', url: '/customer/notification' },
      { label: '문의접수', url: '/customer/inquiry' },
    ],
  },
];
