import { CompanyInfoType } from '@/types/frame';
import { createClient } from '@/utils/supabase/server';

export const getCompanyInfo = async (): Promise<CompanyInfoType[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('company_info').select('*');
  if (error) {
    console.error('Error fetching company info:', error);
    return [];
  }
  return data;
};
