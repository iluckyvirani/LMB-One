import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopListing } from "@/components/ShopListing";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="px-6 py-24 text-center text-muted">
          Loading shop…
        </div>
      }
    >
      <ShopListing />
    </Suspense>
  );
}
