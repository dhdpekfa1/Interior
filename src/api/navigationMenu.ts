import { createClient } from '@/utils/supabase/server';
import { MenuItem } from '@/types/frame';

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

  console.log('menuData', menuData);

  return menuData;
};
