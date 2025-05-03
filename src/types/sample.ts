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
