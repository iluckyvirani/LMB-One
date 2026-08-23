"use client";

import { useRecentlyViewedStore } from "@/store/recentlyViewed";
import { getProductById } from "@/lib/products";
import { useHasHydrated } from "@/lib/useHasHydrated";
import { ProductRail } from "@/components/ProductRail";

export function RecentlyViewedRail() {
  const hydrated = useHasHydrated();
  const productIds = useRecentlyViewedStore((s) => s.productIds);

  if (!hydrated) return null;

  const products = productIds
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  if (products.length === 0) return null;

  return <ProductRail title="Recently Viewed" products={products} />;
}
