"use client";

import Link from "next/link";
import { useWishlistStore } from "@/store/wishlist";
import { useHasHydrated } from "@/lib/useHasHydrated";
import { ProductCard } from "@/components/ProductCard";
import { AccountShell } from "@/components/account/AccountShell";

export function WishlistView() {
  const items = useWishlistStore((s) => s.items);
  const hydrated = useHasHydrated();

  if (!hydrated) return null;

  return (
    <AccountShell activeTab="wishlist" breadcrumbLabel="Wishlist">
      <h1 className="mb-6 font-heading text-3xl text-foreground">My Wishlist</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="text-muted">Your wishlist is empty.</p>
          <Link
            href="/shop"
            className="rounded-full bg-gold px-8 py-3 font-medium text-background transition-colors hover:bg-gold-accent"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </AccountShell>
  );
}
