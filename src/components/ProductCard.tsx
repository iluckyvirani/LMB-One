"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import { discountPercent, formatINR } from "@/lib/format";
import { ProductArt } from "@/components/ProductArt";
import { useWishlistStore } from "@/store/wishlist";

export function ProductCard({ product }: { product: Product }) {
  const off = discountPercent(product.price, product.mrp);
  const { toggleWishlist, hasItem } = useWishlistStore();
  const isWishlisted = hasItem(product.id);

  return (
    <div className="group h-full overflow-hidden border border-white/10 bg-white/[0.03] transition-colors hover:border-gold/40">
      <div className="relative aspect-[4/5] overflow-hidden bg-background-secondary">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <ProductArt
            product={product}
            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {off > 0 && (
          <span className="absolute left-3 top-3 bg-gold px-2 py-1 font-[family-name:var(--font-poppins)] text-[10px] tracking-wide text-background uppercase pointer-events-none">
            {off}% off
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted backdrop-blur transition-colors hover:text-gold"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className="h-4 w-4"
            fill={isWishlisted ? "var(--gold)" : "none"}
            stroke={isWishlisted ? "var(--gold)" : "currentColor"}
          />
        </button>
      </div>
      <Link href={`/product/${product.slug}`} className="block">
        <div className="space-y-2 p-4">
          <p className="text-xs tracking-widest text-gold/80 uppercase">
            {product.colorway}
          </p>
          <h3 className="font-heading text-lg leading-snug text-white transition-colors group-hover:text-gold">
            {product.title}
          </h3>
          <div className="flex items-baseline gap-2 font-[family-name:var(--font-poppins)]">
            <span className="text-gold">{formatINR(product.price)}</span>
            {product.mrp > product.price && (
              <span className="text-sm text-muted line-through">
                {formatINR(product.mrp)}
              </span>
            )}
          </div>
          <p className="text-xs text-muted">
            ★ {product.rating} · {product.reviewsCount} reviews
          </p>
        </div>
      </Link>
    </div>
  );
}
