import type { Category, Collection, Product, Style } from "@/lib/types";
import { discountPercent } from "@/lib/format";
import { api, ApiError } from "@/lib/api";

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "kids", label: "Kids" },
  { value: "sports", label: "Sports" },
];

export const STYLES: { value: Style; label: string }[] = [
  { value: "formal", label: "Formal Shoes" },
  { value: "casual", label: "Casual Shoes" },
  { value: "heels", label: "Heels" },
  { value: "flats", label: "Flats" },
  { value: "sandals", label: "Sandals" },
  { value: "sports", label: "Sports Shoes" },
  { value: "boots", label: "Boots" },
];

export const COLLECTIONS: Collection[] = ["LMB Heritage", "LMB Édition", "LMB Sport"];

export const DISCOUNT_TIERS = [10, 20, 30, 40, 50, 60, 70, 80] as const;

export const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
  { value: "discount", label: "Better Discount" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export const PRICE_BUCKETS = [
  { label: "Under ₹2,000", min: 0, max: 2000 },
  { label: "₹2,000 - ₹3,500", min: 2000, max: 3500 },
  { label: "₹3,500 - ₹5,000", min: 3500, max: 5000 },
  { label: "Above ₹5,000", min: 5000, max: 999999 },
] as const;

// ---- Data fetching (backed by the Express/Postgres API) ----

export async function fetchAllProducts(): Promise<Product[]> {
  return api.get<Product[]>("/products?limit=200");
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    return await api.get<Product>(`/products/${encodeURIComponent(slug)}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

// ---- Pure helpers — all operate on a products list passed in by the caller ----

export function getFeaturedProducts(products: Product[], limit = 8) {
  return products.slice(0, limit);
}

export function getProductsByTag(
  products: Product[],
  tag: Product["tags"][number],
  limit?: number,
) {
  const list = products.filter((p) => p.tags.includes(tag));
  return limit ? list.slice(0, limit) : list;
}

export function getOffers(products: Product[], minDiscount = 20, limit = 8) {
  return sortProducts(
    products.filter((p) => discountPercent(p.price, p.mrp) >= minDiscount),
    "discount",
  ).slice(0, limit);
}

export function getProductsByCategory(products: Product[], category?: string) {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

export function getProductById(products: Product[], id: string) {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(products: Product[], product: Product, limit = 4) {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export function searchProducts(products: Product[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.colorway.toLowerCase().includes(q) ||
      p.style.toLowerCase().includes(q) ||
      p.collection.toLowerCase().includes(q),
  );
}

export function getAllColors(products: Product[]) {
  const map = new Map<string, string>();
  for (const p of products) map.set(p.color, p.colorHex);
  return Array.from(map, ([name, hex]) => ({ name, hex }));
}

export function getPriceBounds(products: Product[]) {
  if (products.length === 0) return { min: 0, max: 0 };
  const prices = products.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export type ProductFilters = {
  categories: Category[];
  styles: Style[];
  collections: Collection[];
  colors: string[];
  size: number | null;
  priceRange: [number, number];
  minDiscount: number;
};

export function filterProducts(base: Product[], filters: Partial<ProductFilters>) {
  return base.filter((p) => {
    if (filters.categories?.length && !filters.categories.includes(p.category))
      return false;
    if (filters.styles?.length && !filters.styles.includes(p.style)) return false;
    if (filters.collections?.length && !filters.collections.includes(p.collection))
      return false;
    if (filters.colors?.length && !filters.colors.includes(p.color)) return false;
    if (filters.size && !p.sizes.includes(filters.size)) return false;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (p.price < min || p.price > max) return false;
    }
    if (filters.minDiscount && discountPercent(p.price, p.mrp) < filters.minDiscount)
      return false;
    return true;
  });
}

export function sortProducts(products: Product[], sort: SortValue) {
  const list = [...products];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "rating":
      return list.sort((a, b) => b.rating - a.rating);
    case "discount":
      return list.sort(
        (a, b) =>
          discountPercent(b.price, b.mrp) - discountPercent(a.price, a.mrp),
      );
    default:
      return list;
  }
}

export function getAllSizes(products: Product[]) {
  const set = new Set<number>();
  for (const p of products) for (const s of p.sizes) set.add(s);
  return Array.from(set).sort((a, b) => a - b);
}
