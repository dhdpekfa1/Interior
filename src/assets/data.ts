interface SubMenuItem {
  label: string;
  url: string;
  img?: string;
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
    baseUrl: '/about',
    subMenu: [
      { label: '회사소개', url: '/about/us' },
      { label: '찾아오시는 길', url: '/about/directions' },
    ],
  },
  {
    title: '제품소개',
    baseUrl: '/product',
    subMenu: [
      {
        label: '데코타일',
        url: '/product/deco',
        img: 'https://plus.unsplash.com/premium_photo-1732776567082-cbcd94f49316?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        label: '우드타일',
        url: '/product/wood',
        img: 'https://images.unsplash.com/photo-1594341715655-c695ba36ccd9?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        label: '카펫타일',
        url: '/product/carpet-tiles',
        img: 'https://images.unsplash.com/photo-1676474987690-2fc0582a07ec?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        label: '카페트',
        url: '/product/carpet',
        img: 'https://images.unsplash.com/photo-1444362408440-274ecb6fc730?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        label: '디럭스타일',
        url: '/product/deluxe',
        img: 'https://images.unsplash.com/photo-1580398562556-d33329a0f29b?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        label: '수평몰탈',
        url: '/product/self',
        img: 'https://images.unsplash.com/photo-1454694220579-9d6672b1ec2a?q=80&w=2185&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    menuTitle: [
      '전체',
      'title1',
      'title2',
      'title3',
      'title4',
      'title5',
      'title6',
      'title7',
      'title8',
    ],
  },
  {
    title: '시공사례',
    baseUrl: '/construction',
    subMenu: [
      {
        label: '데코타일',
        url: '/construction/deco',
        img: 'https://plus.unsplash.com/premium_photo-1732776567082-cbcd94f49316?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        label: '우드타일',
        url: '/construction/wood',
        img: 'https://images.unsplash.com/photo-1594341715655-c695ba36ccd9?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        label: '카펫타일',
        url: '/construction/carpet-tiles',
        img: 'https://images.unsplash.com/photo-1676474987690-2fc0582a07ec?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        label: '카페트',
        url: '/construction/carpet',
        img: 'https://images.unsplash.com/photo-1444362408440-274ecb6fc730?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        label: '디럭스타일',
        url: '/construction/deluxe',
        img: 'https://images.unsplash.com/photo-1580398562556-d33329a0f29b?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        label: '수평몰탈',
        url: '/construction/self',
        img: 'https://images.unsplash.com/photo-1454694220579-9d6672b1ec2a?q=80&w=2185&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
  {
    title: '고객지원',
    baseUrl: '',
    subMenu: [{ label: '공지사항', url: '' }],
  },
];
