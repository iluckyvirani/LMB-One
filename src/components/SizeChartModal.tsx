"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { footLengthCm } from "@/lib/productDetails";

export function SizeChartModal({
  sizes,
  open,
  onClose,
}: {
  sizes: number[];
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md border border-white/10 bg-background-secondary shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 text-muted hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="border-b border-white/10 bg-gold/10 px-6 py-5 pr-12">
          <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
            Size Chart
          </p>
          <h2 className="mt-1 font-heading text-2xl text-white">Find Your Fit</h2>
        </div>

        <div className="px-6 py-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-muted">
                <th className="pb-2 font-normal">UK Size</th>
                <th className="pb-2 font-normal">Foot Length (cm)</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => (
                <tr key={size} className="border-b border-white/5">
                  <td className="py-2.5 text-foreground">{size}</td>
                  <td className="py-2.5 text-muted">{footLengthCm(size)} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-xs text-muted">
            Measure your foot in the evening for the most accurate fit — feet
            tend to be slightly larger later in the day.
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
