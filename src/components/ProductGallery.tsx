"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Expand, X } from "lucide-react";
import { Footprints } from "lucide-react";
import { clsx } from "clsx";
import type { Product } from "@/lib/types";

const ANGLES = [
  { rotate: 0, scaleX: 1 },
  { rotate: 12, scaleX: 1 },
  { rotate: 0, scaleX: -1 },
  { rotate: -8, scaleX: 1 },
];

function Frame({
  product,
  angle,
  className,
}: {
  product: Product;
  angle: (typeof ANGLES)[number];
  className?: string;
}) {
  return (
    <div
      className={clsx("flex items-center justify-center", className)}
      style={{
        background: `linear-gradient(135deg, ${product.swatch[0]}, ${product.swatch[1]})`,
      }}
    >
      <Footprints
        className="h-1/4 w-1/4 text-white/70"
        strokeWidth={1.25}
        style={{
          transform: `rotate(${angle.rotate}deg) scaleX(${angle.scaleX})`,
        }}
      />
    </div>
  );
}

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  return (
    <div className="flex gap-3">
      <div className="flex flex-col gap-3">
        {ANGLES.map((angle, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={clsx(
              "h-16 w-14 shrink-0 overflow-hidden border transition-colors sm:h-20 sm:w-16",
              active === i
                ? "border-gold"
                : "border-white/10 hover:border-gold/40",
            )}
            aria-label={`View ${i + 1}`}
          >
            <Frame product={product} angle={angle} className="h-full w-full" />
          </button>
        ))}
      </div>

      <div className="relative flex-1 overflow-hidden bg-background-secondary">
        <Frame
          product={product}
          angle={ANGLES[active]}
          className="aspect-[4/5] h-full w-full"
        />
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="Expand image"
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur hover:text-gold"
        >
          <Expand className="h-4 w-4" />
        </button>
      </div>

      {mounted &&
        lightboxOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-6"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightboxOpen(false)}
              className="absolute right-5 top-5 text-muted hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
            <Frame
              product={product}
              angle={ANGLES[active]}
              className="aspect-[4/5] h-full max-h-[80vh] w-auto max-w-full"
            />
          </div>,
          document.body,
        )}
    </div>
  );
}
