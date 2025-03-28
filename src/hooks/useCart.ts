import { Product } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: Product["id"]) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity) =>
        set((state) => {
          return {
            items: [...state.items, { product, quantity }],
          };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
