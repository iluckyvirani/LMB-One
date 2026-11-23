"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { Heart, Zap, AlertCircle } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { SizeChartModal } from "@/components/SizeChartModal";
import { useHasHydrated } from "@/lib/useHasHydrated";

export function AddToCartButton({ product }: { product: Product }) {
  const router = useRouter();
  const [size, setSize] = useState<number | null>(null);
  const [added, setAdded] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, hasItem } = useWishlistStore();
  const hydrated = useHasHydrated();
  const isWishlisted = hydrated && hasItem(product.id);
  const stock = typeof product.stock === "number" ? product.stock : 10;
  const isOutOfStock = stock <= 0;

  async function handleBuyNow() {
    if (!size || isOutOfStock) return;
    await addItem(product, size);
    router.push("/cart");
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xs uppercase tracking-widest text-muted">Select Size (UK)</p>
            {stock > 0 && stock <= 5 && (
              <span className="text-[11px] font-medium text-amber-400">
                • Only {stock} left in stock
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setChartOpen(true)}
            className="text-xs text-gold hover:underline"
          >
            Size Chart →
          </button>
        </div>

        {isOutOfStock ? (
          <div className="flex items-center gap-2 border border-red-400/30 bg-red-400/5 px-3 py-2 text-xs text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>This pair is currently sold out. Check back soon for the next drop!</span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={clsx(
                  "flex h-10 w-10 items-center justify-center border text-sm transition-colors",
                  size === s
                    ? "border-gold bg-gold/15 text-gold font-semibold ring-1 ring-gold"
                    : "border-white/10 text-muted hover:border-gold/40 hover:text-white",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => {
            if (!size || isOutOfStock) return;
            addItem(product, size);
            setAdded(true);
            window.dispatchEvent(new CustomEvent("lmb:open-cart"));
            setTimeout(() => setAdded(false), 2000);
          }}
          disabled={!size || isOutOfStock}
          className="flex-1 rounded-full border border-gold bg-gold/10 px-6 py-3 font-medium text-gold transition-colors hover:bg-gold/20 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.02] disabled:text-muted/50"
        >
          {isOutOfStock ? "Sold Out" : added ? "Added to Cart ✓" : size ? "Add to Cart" : "Select a Size"}
        </button>

        {!isOutOfStock && (
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={!size}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-medium text-background transition-colors hover:bg-gold-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Zap className="h-4 w-4 fill-background" />
            Buy Now
          </button>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={clsx(
            "flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors",
            isWishlisted
              ? "border-gold text-gold bg-gold/5"
              : "border-white/20 text-foreground hover:border-gold/40",
          )}
        >
          <Heart className="h-4 w-4" fill={isWishlisted ? "var(--gold)" : "none"} />
          <span className="sm:hidden lg:inline">Wishlist</span>
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
