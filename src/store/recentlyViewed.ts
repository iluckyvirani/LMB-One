"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_ITEMS = 8;

type RecentlyViewedState = {
  productIds: string[];
  addView: (productId: string) => void;
};

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      productIds: [],
      addView: (productId) => {
        const rest = get().productIds.filter((id) => id !== productId);
        set({ productIds: [productId, ...rest].slice(0, MAX_ITEMS) });
      },
    }),
    { name: "lmb-shoes-recently-viewed" },
  ),
);
