"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { SizeChartModal } from "@/components/SizeChartModal";
import { useHasHydrated } from "@/lib/useHasHydrated";

export function AddToCartButton({ product }: { product: Product }) {
  const [size, setSize] = useState<number | null>(null);
  const [added, setAdded] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, hasItem } = useWishlistStore();
  const hydrated = useHasHydrated();
  const isWishlisted = hydrated && hasItem(product.id);

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-muted">Select Size</p>
          <button
            type="button"
            onClick={() => setChartOpen(true)}
            className="text-xs text-gold hover:underline"
          >
            Size Chart →
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={clsx(
                "flex h-10 w-10 items-center justify-center border text-sm transition-colors",
                size === s
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-white/10 text-muted hover:border-gold/40",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => {
            if (!size) return;
            addItem(product, size);
            setAdded(true);
            setTimeout(() => setAdded(false), 1500);
          }}
          disabled={!size}
          className="flex-1 rounded-full bg-gold px-8 py-3 font-medium text-background transition-colors hover:bg-gold-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          {added ? "Added to Cart ✓" : size ? "Add to Cart" : "Select a size"}
        </button>
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={clsx(
            "flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors",
            isWishlisted
              ? "border-gold text-gold"
              : "border-white/20 text-foreground hover:border-gold/40",
          )}
        >
          <Heart className="h-4 w-4" fill={isWishlisted ? "var(--gold)" : "none"} />
          Wishlist
        </button>
      </div>

      <SizeChartModal
        sizes={product.sizes}
        open={chartOpen}
        onClose={() => setChartOpen(false)}
      />
    </div>
  );
}
