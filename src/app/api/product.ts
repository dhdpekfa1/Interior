import { Product, ProductCategory, ProductHome } from '@/types/sample';
import { createClient } from '@/utils/supabase/client';

// 홈에서 사용되는 카테고리
export const getProductHome = async (): Promise<ProductHome[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('product')
    .select('home_image, home_description, category, label, id')
    .order('seq', { ascending: true });

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
    category: item.category,
  }));
};

// 전체 카테고리
export const getProductList = async (): Promise<ProductCategory[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('product')
    .select('*')
    .order('seq', { ascending: true });
  if (error) {
    console.error('Error fetching product:', error);
    return [];
  }
  return data;
};

export const getProductLpm = async (): Promise<Product[]> => {
  const supabase = await createClient();
  //   const { data, error } = await supabase.from('product_lpm').select('*');
  const { data, error } = await supabase.from('sorted_product_lpm').select('*');
  if (error) {
    console.error('Error fetching sorted_product_lpm:', error);
    return [];
  }
  return data;
};

export const getProductMirrorLpm = async (): Promise<Product[]> => {
  const supabase = await createClient();
  // const { data, error } = await supabase.from('product_mirror_lpm').select('*');
  const { data, error } = await supabase
    .from('sorted_product_mirror_lpm')
    .select('*');
  if (error) {
    console.error('Error fetching product_mirror_lpm:', error);
    return [];
  }
  return data;
};

export const getProductPvc = async (): Promise<Product[]> => {
  const supabase = await createClient();
  // const { data, error } = await supabase.from('product_pvc_pp').select('*');
  const { data, error } = await supabase
    .from('sorted_product_pvc_pp')
    .select('*');
  if (error) {
    console.error('Error fetching product_pvc_pp:', error);
    return [];
  }
  return data;
};

export const getProductAsa = async (): Promise<Product[]> => {
  const supabase = await createClient();
  // const { data, error } = await supabase.from('product_asa_pet').select('*');
  const { data, error } = await supabase
    .from('sorted_product_asa_pet')
    .select('*');
  if (error) {
    console.error('Error fetching product_asa_pet:', error);
    return [];
  }
  return data;
};

export const getProductHpm = async (): Promise<Product[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('sorted_product_hpm').select('*');
  if (error) {
    console.error('Error fetching product_hpm:', error);
    return [];
  }
  return data;
};
