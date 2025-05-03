import { Product } from '@/types/sample';
import { createClient } from '@/utils/supabase/client';

export const getProductDeco = async (): Promise<Product[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('product_deco').select('*');
  if (error) {
    console.error('Error fetching product_deco:', error);
    return [];
  }
  return data;
};
