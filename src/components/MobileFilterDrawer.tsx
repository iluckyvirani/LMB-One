"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { FilterSidebar, type FilterState } from "@/components/FilterSidebar";
import type { Category, Collection, Product, Style } from "@/lib/types";
import { useHasHydrated } from "@/lib/useHasHydrated";
import { cn } from "@/lib/utils";

export function MobileFilterDrawer({
  open,
  onClose,
  products,
  categoryPool,
  state,
  setState,
  onClear,
  resultCount,
}: {
  open: boolean;
  onClose: () => void;
  products: Product[];
  categoryPool: { category: Category; style: Style; collection: Collection; color: string }[];
  state: FilterState;
  setState: (updater: (s: FilterState) => FilterState) => void;
  onClear: () => void;
  resultCount: number;
}) {
  const mounted = useHasHydrated();

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

  if (!mounted) return null;

  return createPortal(
    <div
      className={cn("fixed inset-0 z-[150] lg:hidden", !open && "pointer-events-none")}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/70 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-background-secondary shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-heading text-lg text-foreground">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="text-muted hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <FilterSidebar
            products={products}
            categoryPool={categoryPool}
            state={state}
            setState={setState}
            onClear={onClear}
            hideHeader
          />
        </div>

        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-gold px-8 py-3 font-medium text-background transition-colors hover:bg-gold-accent"
          >
            Show {resultCount} {resultCount === 1 ? "Result" : "Results"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
