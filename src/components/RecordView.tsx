"use client";

import { useEffect } from "react";
import { useRecentlyViewedStore } from "@/store/recentlyViewed";

export function RecordView({ productId }: { productId: string }) {
  const addView = useRecentlyViewedStore((s) => s.addView);

  useEffect(() => {
    addView(productId);
  }, [productId, addView]);

  return null;
}
