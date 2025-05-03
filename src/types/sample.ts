export type ProductCategory = {
  id: string;
  category: string;
  main_image: string;
  sub_image: string;
  third_image: string;
  content: string;
  home_description: string;
  home_image: string;
  label: string;
};

export type ProductHome = Pick<
  ProductCategory,
  'home_image' | 'home_description' | 'label' | 'id'
> & {
  url: string;
};

export type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
};

export interface Construction {
  id: number;
  location: string;
  product: string;
  category: string;
  images: string[];
}
