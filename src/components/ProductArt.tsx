"use client";

import { useState } from "react";
import { Footprints } from "lucide-react";
import type { Product } from "@/lib/types";
import { clsx } from "clsx";

export function ProductArt({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={clsx(
        "relative flex items-center justify-center overflow-hidden bg-background-secondary/80",
        className,
      )}
      style={{
        background: `linear-gradient(135deg, ${product.swatch[0]}22, ${product.swatch[1]}33)`,
      }}
    >
      {product.image && !imgError ? (
        <img
          src={product.image}
          alt={product.title}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center p-4 text-center"
          style={{
            background: `linear-gradient(135deg, ${product.swatch[0]}, ${product.swatch[1]})`,
          }}
        >
          <Footprints className="h-10 w-10 text-white/60 mb-2" strokeWidth={1.25} />
          <span className="font-heading text-xs tracking-wider text-white/90 uppercase">
            {product.title}
          </span>
        </div>
      )}
    </div>
  );
}
