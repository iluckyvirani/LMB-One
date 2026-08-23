"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CATEGORIES,
  COLLECTIONS,
  DISCOUNT_TIERS,
  STYLES,
  getAllColors,
  getPriceBounds,
} from "@/lib/products";
import type { Category, Collection, Style } from "@/lib/types";
import { PriceRangeSlider } from "@/components/PriceRangeSlider";

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/10 py-5 first:pt-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-xs font-semibold tracking-widest text-foreground uppercase"
      >
        {title}
        <ChevronDown
          className={cn("h-3.5 w-3.5 text-muted transition-transform", open && "rotate-180")}
        />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
  countLabel,
  swatch,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  countLabel?: number;
  swatch?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 accent-[var(--gold)]"
      />
      {swatch && (
        <span
          className="h-3.5 w-3.5 shrink-0 rounded-full border border-white/20"
          style={{ background: swatch }}
        />
      )}
      <span className="flex-1 text-foreground/90">{label}</span>
      {countLabel != null && <span className="text-xs text-muted">({countLabel})</span>}
    </label>
  );
}

export type FilterState = {
  categories: Category[];
  styles: Style[];
  collections: Collection[];
  colors: string[];
  size: number | null;
  priceRange: [number, number];
  minDiscount: number;
};

export function FilterSidebar({
  categoryPool,
  state,
  setState,
  onClear,
}: {
  categoryPool: { category: Category; style: Style; collection: Collection; color: string }[];
  state: FilterState;
  setState: (updater: (s: FilterState) => FilterState) => void;
  onClear: () => void;
}) {
  const bounds = getPriceBounds();
  const colors = getAllColors();

  function toggle<K extends keyof FilterState>(key: K, value: FilterState[K] extends (infer U)[] ? U : never) {
    setState((s) => {
      const arr = s[key] as unknown as unknown[];
      const exists = arr.includes(value);
      return {
        ...s,
        [key]: exists ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  }

  const hasActiveFilters =
    state.categories.length ||
    state.styles.length ||
    state.collections.length ||
    state.colors.length ||
    state.size ||
    state.minDiscount > 0 ||
    state.priceRange[0] !== bounds.min ||
    state.priceRange[1] !== bounds.max;

  return (
    <aside className="w-full lg:w-64 lg:shrink-0">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-sm font-semibold tracking-widest text-foreground uppercase">
          Filters
        </h2>
        {!!hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-gold hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <Section title="Shop For">
        {CATEGORIES.map((c) => (
          <Checkbox
            key={c.value}
            checked={state.categories.includes(c.value)}
            onChange={() => toggle("categories", c.value)}
            label={c.label}
            countLabel={categoryPool.filter((p) => p.category === c.value).length}
          />
        ))}
      </Section>

      <Section title="Category">
        {STYLES.map((s) => (
          <Checkbox
            key={s.value}
            checked={state.styles.includes(s.value)}
            onChange={() => toggle("styles", s.value)}
            label={s.label}
            countLabel={categoryPool.filter((p) => p.style === s.value).length}
          />
        ))}
      </Section>

      <Section title="Collection">
        {COLLECTIONS.map((c) => (
          <Checkbox
            key={c}
            checked={state.collections.includes(c)}
            onChange={() => toggle("collections", c)}
            label={c}
            countLabel={categoryPool.filter((p) => p.collection === c).length}
          />
        ))}
      </Section>

      <Section title="Price">
        <PriceRangeSlider
          bounds={bounds}
          value={state.priceRange}
          onChange={(range) => setState((s) => ({ ...s, priceRange: range }))}
        />
      </Section>

      <Section title="Color">
        {colors.map((c) => (
          <Checkbox
            key={c.name}
            checked={state.colors.includes(c.name)}
            onChange={() => toggle("colors", c.name)}
            label={c.name}
            swatch={c.hex}
            countLabel={categoryPool.filter((p) => p.color === c.name).length}
          />
        ))}
      </Section>

      <Section title="Discount Range" defaultOpen={false}>
        <div className="space-y-1">
          {DISCOUNT_TIERS.map((tier) => (
            <label
              key={tier}
              className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm"
            >
              <input
                type="radio"
                name="discount"
                checked={state.minDiscount === tier}
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    minDiscount: s.minDiscount === tier ? 0 : tier,
                  }))
                }
                onChange={() => {}}
                className="h-4 w-4 shrink-0 accent-[var(--gold)]"
              />
              <span className="text-foreground/90">{tier}% and above</span>
            </label>
          ))}
        </div>
      </Section>
    </aside>
  );
}
