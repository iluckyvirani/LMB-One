"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/types";

export type CartItem = {
  product: Product;
  size: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, size: number, qty?: number) => void;
  removeItem: (productId: string, size: number) => void;
  updateQty: (productId: string, size: number, qty: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, size, qty = 1) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.product.id === product.id && i.size === size,
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i === existing ? { ...i, qty: i.qty + qty } : i,
            ),
          });
        } else {
          set({ items: [...items, { product, size, qty }] });
        }
      },
      removeItem: (productId, size) =>
        set({
          items: get().items.filter(
            (i) => !(i.product.id === productId && i.size === size),
          ),
        }),
      updateQty: (productId, size, qty) =>
        set({
          items: get().items.map((i) =>
            i.product.id === productId && i.size === size
              ? { ...i, qty: Math.max(1, qty) }
              : i,
          ),
        }),
      clear: () => set({ items: [] }),
    }),
    { name: "lmb-shoes-cart" },
  ),
);

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.qty, 0);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
}
