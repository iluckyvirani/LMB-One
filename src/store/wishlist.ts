"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/types";

type WishlistState = {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  hasItem: (productId: string) => boolean;
  removeItem: (productId: string) => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleWishlist: (product) => {
        const exists = get().items.some((p) => p.id === product.id);
        set({
          items: exists
            ? get().items.filter((p) => p.id !== product.id)
            : [...get().items, product],
        });
      },
      hasItem: (productId) => get().items.some((p) => p.id === productId),
      removeItem: (productId) =>
        set({ items: get().items.filter((p) => p.id !== productId) }),
    }),
    { name: "lmb-shoes-wishlist" },
  ),
);
