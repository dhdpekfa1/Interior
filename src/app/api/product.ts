import { Product, ProductCategory, ProductHome } from '@/types/sample';
import { createClient } from '@/utils/supabase/client';

// 홈에서 사용되는 카테고리
export const getProductHome = async (): Promise<ProductHome[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('product')
    .select('home_image, home_description, category, label, id');

  if (error) {
    console.error('Error fetching product_home:', error);
    return [];
  }

  return (data ?? []).map((item) => ({
    id: item.id,
    home_image: item.home_image,
    home_description: item.home_description,
    label: item.label,
    url: `/product/${item.category}`,
  }));
};

// 전체 카테고리
export const getProductList = async (): Promise<ProductCategory[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('product').select('*');
  if (error) {
    console.error('Error fetching product:', error);
    return [];
  }
  return data;
};

export const getProductDeco = async (): Promise<Product[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('product_deco').select('*');
  if (error) {
    console.error('Error fetching product_deco:', error);
    return [];
  }
  return data;
};

export const getProductWood = async (): Promise<Product[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('product_wood').select('*');
  if (error) {
    console.error('Error fetching product_wood:', error);
    return [];
  }
  return data;
};
