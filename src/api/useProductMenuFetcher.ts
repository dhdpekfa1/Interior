'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import type { SubMenuItem } from '@/types/frame';

export const useProductMenuFetcher = () => {
  const [subMenuData, setSubMenuData] = useState<SubMenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubMenu = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('navigation_sub_menu')
        .select('label, url, description, img')
        .eq('menu_id', 'c2c22131-25ab-4e9b-9c72-cd51194fea3e')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching sub_menu data: ', error);
        return;
      }

      setSubMenuData(data || []);
      setLoading(false);
    };

    fetchSubMenu();
  }, []);

  return { subMenuData, loading };
};
