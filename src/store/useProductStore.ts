import { create } from 'zustand';

interface Product {
  id: string;
  name: string;
  count: number;
}

interface ProductStore {
  selectedProducts: Product[];
  addProduct: (product: Product) => void;
  updateCount: (id: string, count: number) => void;
  removeProduct: (id: string) => void;
  reset: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  selectedProducts: [],
  addProduct: (product) =>
    set((state) => ({
      selectedProducts: [...state.selectedProducts, product],
    })),
  updateCount: (id, count) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.map((p) =>
        p.id === id ? { ...p, count } : p
      ),
    })),
  removeProduct: (id) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.filter((p) => p.id !== id),
    })),
  reset: () => set({ selectedProducts: [] }),
}));
