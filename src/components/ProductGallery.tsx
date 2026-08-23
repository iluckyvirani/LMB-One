"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Expand, X, Footprints } from "lucide-react";
import { clsx } from "clsx";
import type { Product } from "@/lib/types";

export function ProductGallery({ product }: { product: Product }) {
  const galleryList = product.images && product.images.length > 0
    ? product.images
    : product.image
    ? [product.image]
    : [];

  // Default to 4 frames (using images or fallback)
  const items = galleryList.length > 0 
    ? (galleryList.length === 1 ? [galleryList[0], galleryList[0], galleryList[0], galleryList[0]] : galleryList)
    : [];

  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  const activeSrc = items[active] || product.image;

  return (
    <div className="flex gap-4">
      {items.length > 0 && (
        <div className="flex flex-col gap-3">
          {items.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={clsx(
                "group relative h-20 w-16 shrink-0 overflow-hidden border bg-background-secondary transition-all sm:h-24 sm:w-20",
                active === i
                  ? "border-gold ring-1 ring-gold shadow-md"
                  : "border-white/10 opacity-70 hover:opacity-100 hover:border-gold/50",
              )}
              aria-label={`View angle ${i + 1}`}
            >
              {!imgError[i] && src ? (
                <img
                  src={src}
                  alt={`${product.title} view ${i + 1}`}
                  onError={() => setImgError((prev) => ({ ...prev, [i]: true }))}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${product.swatch[0]}, ${product.swatch[1]})`,
                  }}
                >
                  <Footprints className="h-6 w-6 text-white/60" />
                </div>
              )}
              {active === i && (
                <span className="absolute bottom-0 inset-x-0 h-1 bg-gold" />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="relative flex-1 overflow-hidden border border-white/10 bg-background-secondary">
        {activeSrc && !imgError[active] ? (
          <img
            src={activeSrc}
            alt={product.title}
            onError={() => setImgError((prev) => ({ ...prev, [active]: true }))}
            className="aspect-[4/5] h-full w-full object-cover object-center transition-all duration-500"
          />
        ) : (
          <div
            className="flex aspect-[4/5] h-full w-full flex-col items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${product.swatch[0]}, ${product.swatch[1]})`,
            }}
          >
            <Footprints className="h-16 w-16 text-white/50 mb-3" />
            <p className="font-heading text-lg text-white/90">{product.title}</p>
          </div>
        )}

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="Expand image"
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur border border-white/10 transition-transform hover:scale-110 hover:text-gold"
        >
          <Expand className="h-4 w-4" />
        </button>
      </div>

      {mounted &&
        lightboxOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightboxOpen(false)}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-muted transition-colors hover:bg-white/20 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
            <div
              className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-lg border border-white/20 bg-background"
              onClick={(e) => e.stopPropagation()}
            >
              {activeSrc && !imgError[active] ? (
                <img
                  src={activeSrc}
                  alt={product.title}
                  className="max-h-[85vh] w-auto object-contain"
                />
              ) : (
                <div
                  className="flex h-96 w-96 items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${product.swatch[0]}, ${product.swatch[1]})`,
                  }}
                >
                  <Footprints className="h-20 w-20 text-white/70" />
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
