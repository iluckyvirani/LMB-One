"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/types";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

const MAX_ITEMS = 8;

type RecentlyViewedState = {
  items: Product[];
  addView: (product: Product) => Promise<void>;
  /** Pushes any guest-browsed items up to the server, then reconciles with the
   * canonical (server) view history — same merge-on-login pattern as wishlist. */
  syncWithServer: () => Promise<void>;
};

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      items: [],

      addView: async (product) => {
        const rest = get().items.filter((p) => p.id !== product.id);
        set({ items: [product, ...rest].slice(0, MAX_ITEMS) });
        if (useAuthStore.getState().isLoggedIn) {
          await api.post("/customer/recently-viewed", { productId: product.id }).catch(() => {});
        }
      },

      syncWithServer: async () => {
        const local = get().items;
        await Promise.all(
          local.map((p) =>
            api.post("/customer/recently-viewed", { productId: p.id }).catch(() => {}),
          ),
        );
        const items = await api.get<Product[]>("/customer/recently-viewed");
        set({ items });
      },
    }),
    { name: "lmb-shoes-recently-viewed" },
  ),
);

// Clear on logout — a guest's local browsing history shouldn't leak into whichever
// account logs in next on the same browser.
let wasLoggedIn = useAuthStore.getState().isLoggedIn;
useAuthStore.subscribe((state) => {
  if (wasLoggedIn && !state.isLoggedIn) {
    useRecentlyViewedStore.setState({ items: [] });
  }
  wasLoggedIn = state.isLoggedIn;
});
