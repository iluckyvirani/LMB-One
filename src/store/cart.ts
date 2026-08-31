"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/types";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

export type CartItem = {
  product: Product;
  size: number;
  qty: number;
};

function key(productId: string, size: number) {
  return `${productId}:${size}`;
}

type CartState = {
  items: CartItem[];
  addItem: (product: Product, size: number, qty?: number) => Promise<void>;
  removeItem: (productId: string, size: number) => Promise<void>;
  updateQty: (productId: string, size: number, qty: number) => Promise<void>;
  clear: () => Promise<void>;
  /** Reconciles local state with the server: pushes any local-only lines up, then
   * replaces local state with the canonical server cart. Safe to call repeatedly —
   * once a line exists server-side it's never re-pushed, so quantities never inflate. */
  syncWithServer: () => Promise<void>;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: async (product, size, qty = 1) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.product.id === product.id && i.size === size,
        );
        if (existing) {
          set({
            items: items.map((i) => (i === existing ? { ...i, qty: i.qty + qty } : i)),
          });
        } else {
          set({ items: [...items, { product, size, qty }] });
        }
        if (useAuthStore.getState().isLoggedIn) {
          await api.post("/customer/cart", { productId: product.id, size, qty }).catch(() => {});
        }
      },

      removeItem: async (productId, size) => {
        set({
          items: get().items.filter((i) => !(i.product.id === productId && i.size === size)),
        });
        if (useAuthStore.getState().isLoggedIn) {
          await api.delete(`/customer/cart/${productId}/${size}`).catch(() => {});
        }
      },

      updateQty: async (productId, size, qty) => {
        const nextQty = Math.max(1, qty);
        set({
          items: get().items.map((i) =>
            i.product.id === productId && i.size === size ? { ...i, qty: nextQty } : i,
          ),
        });
        if (useAuthStore.getState().isLoggedIn) {
          await api.put(`/customer/cart/${productId}/${size}`, { qty: nextQty }).catch(() => {});
        }
      },

      clear: async () => {
        set({ items: [] });
        if (useAuthStore.getState().isLoggedIn) {
          await api.delete("/customer/cart").catch(() => {});
        }
      },

      syncWithServer: async () => {
        const local = get().items;
        const server = await api.get<CartItem[]>("/customer/cart");
        const serverKeys = new Set(server.map((i) => key(i.product.id, i.size)));
        const toPush = local.filter((i) => !serverKeys.has(key(i.product.id, i.size)));

        if (!toPush.length) {
          set({ items: server });
          return;
        }
        await Promise.all(
          toPush.map((i) =>
            api
              .post("/customer/cart", { productId: i.product.id, size: i.size, qty: i.qty })
              .catch(() => {}),
          ),
        );
        const merged = await api.get<CartItem[]>("/customer/cart");
        set({ items: merged });
      },
    }),
    { name: "lmb-shoes-cart" },
  ),
);

// Clear on logout — otherwise a leftover local cart would get pushed into
// whichever account logs in next on the same browser.
let wasLoggedIn = useAuthStore.getState().isLoggedIn;
useAuthStore.subscribe((state) => {
  if (wasLoggedIn && !state.isLoggedIn) {
    useCartStore.setState({ items: [] });
  }
  wasLoggedIn = state.isLoggedIn;
});

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.qty, 0);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
}
