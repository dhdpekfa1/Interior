import { User } from '@supabase/supabase-js';
import { createClient } from '@/app/lib/supabase/server';

export const getAdminUser = async (): Promise<User | null> => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  return user;
};
