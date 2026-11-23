"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from "lucide-react";
import { useCartStore, cartSubtotal, cartCount } from "@/store/cart";
import { useSettingsStore, computeShipping } from "@/store/settings";
import { formatINR } from "@/lib/format";
import { ProductArt } from "@/components/ProductArt";

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const settings = useSettingsStore((s) => s.settings);

  const subtotal = cartSubtotal(items);
  const shipping = computeShipping(subtotal, settings);
  const freeThreshold = settings.freeShippingThreshold;
  const awayFromFree = freeThreshold > 0 && subtotal < freeThreshold ? freeThreshold - subtotal : 0;
  const count = cartCount(items);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-white/10 bg-background-secondary shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-gold" />
              <h2 className="font-heading text-lg text-foreground">
                Shopping Bag ({count})
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-muted hover:text-white transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Shipping Alert Bar */}
          {awayFromFree > 0 && items.length > 0 && (
            <div className="border-b border-gold/20 bg-gold/5 px-6 py-2.5 text-xs text-gold flex items-center gap-2">
              <Truck className="h-4 w-4 shrink-0" />
              <span>
                Add <strong>{formatINR(awayFromFree)}</strong> more for Free Express Shipping!
              </span>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/5">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center py-12">
                <ShoppingBag className="h-12 w-12 text-muted/40 mb-3" />
                <p className="font-heading text-lg text-foreground">Your bag is empty</p>
                <p className="mt-1 text-xs text-muted">
                  Discover our bespoke footwear collections.
                </p>
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="mt-6 rounded-full bg-gold px-6 py-2.5 text-xs font-semibold text-background hover:bg-gold-accent transition-colors"
                >
                  Explore Shop
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 py-4 first:pt-0"
                >
                  <div className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded bg-background">
                    <ProductArt product={item.product} className="h-full w-full" />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={onClose}
                          className="font-heading text-sm text-foreground hover:text-gold line-clamp-1"
                        >
                          {item.product.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="text-muted hover:text-red-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs text-muted">
                        Size: UK {item.size} · {item.product.colorway}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-white/10 rounded">
                        <button
                          type="button"
                          onClick={() => updateQty(item.product.id, item.size, item.qty - 1)}
                          className="flex h-7 w-7 items-center justify-center text-muted hover:text-gold"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-xs">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.product.id, item.size, item.qty + 1)}
                          className="flex h-7 w-7 items-center justify-center text-muted hover:text-gold"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-gold">
                        {formatINR(item.product.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {items.length > 0 && (
            <div className="border-t border-white/10 p-6 space-y-3 bg-white/[0.02]">
              <div className="flex justify-between text-xs text-muted">
                <span>Subtotal</span>
                <span className="text-foreground">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-muted">
                <span>Shipping</span>
                <span className="text-foreground">
                  {shipping === 0 ? "Free" : formatINR(shipping)}
                </span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 font-[family-name:var(--font-poppins)] text-base font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-gold">{formatINR(subtotal + shipping)}</span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3 text-xs font-semibold text-background hover:bg-gold-accent transition-colors"
                >
                  Checkout Now <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="text-center text-xs text-muted hover:text-gold py-1"
                >
                  View full cart details
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

