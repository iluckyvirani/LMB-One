"use client";

import { useRecentlyViewedStore } from "@/store/recentlyViewed";
import { useHasHydrated } from "@/lib/useHasHydrated";
import { ProductRail } from "@/components/ProductRail";

export function RecentlyViewedRail() {
  const hydrated = useHasHydrated();
  const products = useRecentlyViewedStore((s) => s.items);

  if (!hydrated || products.length === 0) return null;

  return <ProductRail title="Recently Viewed" products={products} />;
}
