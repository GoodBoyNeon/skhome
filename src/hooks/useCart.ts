import { Product } from "@/generated/prisma";
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
  setQuantity: (product: Product, newQuantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, _get) => ({
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

      setQuantity: (product, newQuantity) => {
        set((state) => {
          const newProduct = { product, quantity: newQuantity };
          const index = state.items.findIndex(
            (p) => p.product.id === product.id,
          );
          const newItems = state.items;
          newItems[index] = newProduct;
          return {
            items: newItems,
          };
        });
      },
      clear: () => set({ items: [] }),
    }),

    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
