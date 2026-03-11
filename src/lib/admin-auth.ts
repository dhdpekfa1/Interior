import { User } from '@supabase/supabase-js';
import { createClient } from '@/app/lib/supabase/server';

const parseAdminEmails = () =>
  (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

export const isAdminEmail = (email: string | null | undefined): boolean => {
  if (!email) return false;
  const admins = parseAdminEmails();
  if (admins.length === 0) return false;
  return admins.includes(email.toLowerCase());
};

export const getAdminUser = async (): Promise<User | null> => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;
  if (!isAdminEmail(user.email)) return null;

  return user;
};
