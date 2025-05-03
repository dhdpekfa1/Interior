// navBar
export type MenuItem = {
  title: string;
  baseUrl: string;
  subMenu: SubMenuItem[];
};

export type SubMenuItem = {
  label: string;
  url: string;
  description?: string;
  img?: string;
};

// Footer
export type CompanyInfoType = {
  label: string;
  content: string;
  direction: 'left' | 'right';
  link?: string;
};
