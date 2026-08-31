import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopListing } from "@/components/ShopListing";
import { fetchAllProducts } from "@/lib/products";

export const metadata: Metadata = { title: "Shop" };

export default async function ShopPage() {
  const products = await fetchAllProducts();
  return (
    <Suspense
      fallback={
        <div className="px-6 py-24 text-center text-muted">
          Loading shop…
        </div>
      }
    >
      <ShopListing products={products} />
    </Suspense>
  );
}
