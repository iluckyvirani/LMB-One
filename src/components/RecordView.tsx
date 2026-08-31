"use client";

import { useEffect } from "react";
import type { Product } from "@/lib/types";
import { useRecentlyViewedStore } from "@/store/recentlyViewed";

export function RecordView({ product }: { product: Product }) {
  const addView = useRecentlyViewedStore((s) => s.addView);

  useEffect(() => {
    addView(product).catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  return null;
}
