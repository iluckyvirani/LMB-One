"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/types";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

type WishlistState = {
  items: Product[];
  toggleWishlist: (product: Product) => Promise<void>;
  hasItem: (productId: string) => boolean;
  removeItem: (productId: string) => Promise<void>;
  fetchWishlist: () => Promise<void>;
  /** Pushes any guest-added items up to the server, then reconciles with the canonical list. */
  syncLocalToServer: () => Promise<void>;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      hasItem: (productId) => get().items.some((p) => p.id === productId),

      toggleWishlist: async (product) => {
        const exists = get().items.some((p) => p.id === product.id);
        const isLoggedIn = useAuthStore.getState().isLoggedIn;
        if (exists) {
          set({ items: get().items.filter((p) => p.id !== product.id) });
          if (isLoggedIn) {
            await api.delete(`/customer/wishlist/${product.id}`).catch(() => {});
          }
        } else {
          set({ items: [...get().items, product] });
          if (isLoggedIn) {
            await api.post("/customer/wishlist", { productId: product.id }).catch(() => {});
          }
        }
      },

      removeItem: async (productId) => {
        set({ items: get().items.filter((p) => p.id !== productId) });
        if (useAuthStore.getState().isLoggedIn) {
          await api.delete(`/customer/wishlist/${productId}`).catch(() => {});
        }
      },

      fetchWishlist: async () => {
        const items = await api.get<Product[]>("/customer/wishlist");
        set({ items });
      },

      syncLocalToServer: async () => {
        const local = get().items;
        await Promise.all(
          local.map((p) =>
            api.post("/customer/wishlist", { productId: p.id }).catch(() => {}),
          ),
        );
        await get().fetchWishlist();
      },
    }),
    { name: "lmb-shoes-wishlist" },
  ),
);

// Clear on logout — otherwise a leftover local wishlist would get pushed into
// whichever account logs in next on the same browser.
let wasLoggedIn = useAuthStore.getState().isLoggedIn;
useAuthStore.subscribe((state) => {
  if (wasLoggedIn && !state.isLoggedIn) {
    useWishlistStore.setState({ items: [] });
  }
  wasLoggedIn = state.isLoggedIn;
});
