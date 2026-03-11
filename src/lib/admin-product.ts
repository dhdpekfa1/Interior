export const ADMIN_PRODUCT_CATEGORIES = [
  { label: 'LPM', value: 'lpm' },
  { label: '경면 LPM', value: 'mirror-lpm' },
  { label: 'PVC/PP', value: 'pvc-pp' },
  { label: 'ASA/PET', value: 'asa-pet' },
  { label: 'HPM', value: 'hpm' },
] as const;

const PRODUCT_TABLE_BY_CATEGORY: Record<string, string> = {
  lpm: 'product_lpm',
  'mirror-lpm': 'product_mirror_lpm',
  'pvc-pp': 'product_pvc_pp',
  'asa-pet': 'product_asa_pet',
  hpm: 'product_hpm',
};

export const getProductTableByCategory = (category: string): string | null => {
  return PRODUCT_TABLE_BY_CATEGORY[category] ?? null;
};
