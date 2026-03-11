import { SUPABASE_URL } from '@/constants/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '@/constants/server';
import { createClient } from '@supabase/supabase-js';

export const createAdminClient = () => {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('supabase 설정 오류');
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};
