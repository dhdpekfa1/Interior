import { User } from '@supabase/supabase-js';
import { createClient } from '@/app/lib/supabase/server';

const hasAdminRole = (user: User): boolean => {
  const appMeta = user.app_metadata as Record<string, unknown> | undefined;
  if (!appMeta) return false;

  if (appMeta.role === 'admin') return true;
  if (appMeta.is_admin === true) return true;

  const roles = appMeta.roles;
  if (Array.isArray(roles)) {
    return roles.some((role) => String(role).toLowerCase() === 'admin');
  }

  return false;
};

export const getAdminUser = async (): Promise<User | null> => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;
  if (!hasAdminRole(user)) return null;

  return user;
};
