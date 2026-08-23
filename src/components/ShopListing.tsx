"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, ChevronLeft, ChevronRight, ChevronsLeft } from "lucide-react";
import {
  CATEGORIES,
  PRODUCTS,
  SORT_OPTIONS,
  filterProducts,
  getAllSizes,
  getPriceBounds,
  getProductsByTag,
  searchProducts,
  sortProducts,
  type SortValue,
} from "@/lib/products";
import type { Category, Tag } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar, type FilterState } from "@/components/FilterSidebar";
import { MobileFilterDrawer } from "@/components/MobileFilterDrawer";

const PAGE_SIZE = 8;

function emptyFilters(): FilterState {
  const bounds = getPriceBounds();
  return {
    categories: [],
    styles: [],
    collections: [],
    colors: [],
    size: null,
    priceRange: [bounds.min, bounds.max],
    minDiscount: 0,
  };
}

const TAG_LABELS: Record<Tag, string> = {
  "new-arrival": "New Arrivals",
  bestseller: "Best Sellers",
  "party-wear": "Party Wear",
  "daily-wear": "Daily Wear",
};

export function ShopListing() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as Category | null;
  const tagParam = searchParams.get("tag") as Tag | null;
  const query = searchParams.get("q") ?? "";
  const paramsKey = searchParams.toString();
  const allSizes = getAllSizes();

  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [sort, setSort] = useState<SortValue>("recommended");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const bounds = getPriceBounds();
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    setFilters({
      ...emptyFilters(),
      categories: categoryParam ? [categoryParam] : [],
      priceRange: [
        minPrice ? Math.max(bounds.min, Number(minPrice)) : bounds.min,
        maxPrice ? Math.min(bounds.max, Number(maxPrice)) : bounds.max,
      ],
    });
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey]);

  useEffect(() => {
    setPage(1);
  }, [filters, sort]);

  // Base pool: search results, a tagged rail's deep-link, or the full catalog.
  const pool = query
    ? searchProducts(query)
    : tagParam
      ? getProductsByTag(tagParam)
      : PRODUCTS;
  const categoryPool = filterProducts(pool, { categories: filters.categories });
  const filtered = filterProducts(pool, filters);
  const sorted = sortProducts(filtered, sort);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const activeCategoryLabel =
    filters.categories.length === 1
      ? CATEGORIES.find((c) => c.value === filters.categories[0])?.label
      : null;

  const title = query
    ? `Results for "${query}"`
    : activeCategoryLabel
      ? activeCategoryLabel
      : tagParam
        ? TAG_LABELS[tagParam]
        : "All Shoes";

  function clearFilters() {
    setFilters(emptyFilters());
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-3 text-xs text-muted">
        <Link href="/" className="hover:text-gold">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-gold">
          Shop
        </Link>
        {(activeCategoryLabel || (!activeCategoryLabel && tagParam && !query)) && (
          <>
            <span className="mx-2">/</span>
            <span className="text-foreground/80">
              {activeCategoryLabel || TAG_LABELS[tagParam as Tag]}
            </span>
          </>
        )}
      </nav>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl text-foreground sm:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted">{sorted.length} items</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((v) => !v)}
            className="flex items-center gap-2 border border-white/15 px-3 py-2 text-sm text-foreground lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>

          <label className="flex items-center gap-2 text-sm text-muted">
            Size
            <select
              value={filters.size ?? ""}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  size: e.target.value ? Number(e.target.value) : null,
                }))
              }
              className="border border-white/15 bg-background px-2 py-2 text-sm text-foreground outline-none focus:border-gold"
            >
              <option value="">Any</option>
              {allSizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 text-sm text-muted">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortValue)}
              className="border border-white/15 bg-background px-2 py-2 text-sm text-foreground outline-none focus:border-gold"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="hidden lg:block">
          <FilterSidebar
            categoryPool={categoryPool}
            state={filters}
            setState={setFilters}
            onClear={clearFilters}
          />
        </div>

        <MobileFilterDrawer
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          categoryPool={categoryPool}
          state={filters}
          setState={setFilters}
          onClear={clearFilters}
          resultCount={sorted.length}
        />

        <div className="flex-1">
          {paged.length === 0 ? (
            <p className="py-16 text-center text-muted">
              No products match these filters.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {paged.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage(1)}
                className="flex items-center gap-1 border border-white/15 px-3 py-2 text-sm text-foreground disabled:opacity-30"
              >
                <ChevronsLeft className="h-4 w-4" />
                Page 1
              </button>
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex items-center gap-1 border border-white/15 px-3 py-2 text-sm text-foreground disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <span className="px-3 text-sm text-muted">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="flex items-center gap-1 border border-white/15 px-3 py-2 text-sm text-foreground disabled:opacity-30"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
