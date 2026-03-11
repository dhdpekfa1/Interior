import { redirect } from 'next/navigation';
import AdminProductManager from './AdminProductManager';
import { getAdminUser } from '@/lib/admin-auth';

export default async function AdminPage() {
  const adminUser = await getAdminUser();
  if (!adminUser) {
    redirect('/admin/login');
  }

  return <AdminProductManager />;
}
