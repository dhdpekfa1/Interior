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
export interface CompanyInfoType {
  id: string;
  label: string;
  content: string;
  link?: string;
  direction: 'left' | 'right';
}
