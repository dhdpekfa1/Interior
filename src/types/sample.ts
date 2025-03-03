export interface Product {
  id: number;
  name: string;
  brand: string;
  thickness: string;
  width: string;
  length: string;
  category: string;
  img: string;
}

export interface Construction {
  id: number;
  location: string;
  product: string;
  category: string;
  images: string[];
}
