import { createClient } from '@/app/lib/supabase/server';
import { MenuItem, SubMenuItem } from '@/types/frame';

export const getMenuData = async (): Promise<MenuItem[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('navigation_menu')
    .select(
      `
    title,
    base_url,
    navigation_sub_menu (
      label,
      url,
      description,
      img
    )
  `
    )
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching menu data: ', error);
    return [];
  }

  const menuData: MenuItem[] = data.map((menu) => ({
    title: menu.title,
    baseUrl: menu.base_url,
    subMenu: menu.navigation_sub_menu || [],
  }));

  return menuData;
};

export const getSubMenuData = async (
  // 제품 소개 id
  menuId: string = 'c2c22131-25ab-4e9b-9c72-cd51194fea3e'
): Promise<SubMenuItem[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('navigation_sub_menu')
    .select('label, url, description, img')
    .eq('menu_id', menuId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching sub_menu:', error);
    return [];
  }

  return data || [];
};
