import type { Category, Collection, Product, Style } from "@/lib/types";
import { discountPercent } from "@/lib/format";

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

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "regal-oxford-black",
    title: "Regal Oxford",
    category: "men",
    style: "formal",
    collection: "LMB Heritage",
    tags: ["party-wear", "bestseller"],
    price: 4499,
    mrp: 5999,
    rating: 4.6,
    reviewsCount: 128,
    sizes: [7, 8, 9, 10, 11],
    colorway: "Midnight Black",
    color: "Black",
    colorHex: "#1a1a1a",
    swatch: ["#1a1a1a", "#3a3a3a"],
    description:
      "Handcrafted leather Oxfords with a sleek silhouette — built for boardrooms and evenings out.",
  },
  {
    id: "2",
    slug: "heritage-brogue-tan",
    title: "Heritage Brogue",
    category: "men",
    style: "formal",
    collection: "LMB Heritage",
    tags: ["daily-wear"],
    price: 3999,
    mrp: 4999,
    rating: 4.4,
    reviewsCount: 86,
    sizes: [7, 8, 9, 10, 11, 12],
    colorway: "Tan Brown",
    color: "Tan",
    colorHex: "#8a5a34",
    swatch: ["#8a5a34", "#c99a6a"],
    description:
      "Classic brogue detailing on premium full-grain leather with a cushioned all-day sole.",
  },
  {
    id: "3",
    slug: "velvet-loafer-burgundy",
    title: "Velvet Loafer",
    category: "men",
    style: "casual",
    collection: "LMB Heritage",
    tags: ["party-wear", "new-arrival"],
    price: 3299,
    mrp: 3999,
    rating: 4.3,
    reviewsCount: 54,
    sizes: [7, 8, 9, 10],
    colorway: "Burgundy",
    color: "Burgundy",
    colorHex: "#5c1a2b",
    swatch: ["#5c1a2b", "#8c2f45"],
    description:
      "Slip-on velvet loafers finished with gold embroidery for a refined statement look.",
  },
  {
    id: "4",
    slug: "aurora-heel-nude",
    title: "Aurora Heel",
    category: "women",
    style: "heels",
    collection: "LMB Édition",
    tags: ["party-wear", "bestseller"],
    price: 3799,
    mrp: 4799,
    rating: 4.7,
    reviewsCount: 142,
    sizes: [5, 6, 7, 8, 9],
    colorway: "Nude Blush",
    color: "Blush",
    colorHex: "#d9b8a3",
    swatch: ["#d9b8a3", "#f0d9c8"],
    description:
      "A slender stiletto heel in buttery-soft suede, designed for elegant all-evening comfort.",
  },
  {
    id: "5",
    slug: "gilded-strap-sandal",
    title: "Gilded Strap Sandal",
    category: "women",
    style: "sandals",
    collection: "LMB Édition",
    tags: ["party-wear", "new-arrival"],
    price: 2999,
    mrp: 3799,
    rating: 4.5,
    reviewsCount: 97,
    sizes: [5, 6, 7, 8],
    colorway: "Champagne Gold",
    color: "Gold",
    colorHex: "#c9a227",
    swatch: ["#c9a227", "#e8cf7a"],
    description:
      "Metallic straps with a padded footbed — a versatile sandal for day-to-night wear.",
  },
  {
    id: "6",
    slug: "satin-ballet-flat",
    title: "Satin Ballet Flat",
    category: "women",
    style: "flats",
    collection: "LMB Édition",
    tags: ["daily-wear"],
    price: 2199,
    mrp: 2799,
    rating: 4.2,
    reviewsCount: 63,
    sizes: [5, 6, 7, 8, 9],
    colorway: "Ivory",
    color: "Ivory",
    colorHex: "#efe9de",
    swatch: ["#efe9de", "#d8cfbb"],
    description:
      "Soft satin flats with a rounded toe and flexible sole for effortless everyday elegance.",
  },
  {
    id: "7",
    slug: "little-explorer-sneaker",
    title: "Little Explorer Sneaker",
    category: "kids",
    style: "casual",
    collection: "LMB Sport",
    tags: ["daily-wear", "new-arrival"],
    price: 1499,
    mrp: 1999,
    rating: 4.6,
    reviewsCount: 74,
    sizes: [1, 2, 3, 4, 5],
    colorway: "Sky Blue",
    color: "Blue",
    colorHex: "#3f6fb0",
    swatch: ["#3f6fb0", "#8fb4e0"],
    description:
      "Lightweight, breathable sneakers with a hook-and-loop strap for easy on and off.",
  },
  {
    id: "8",
    slug: "rainbow-trainer",
    title: "Rainbow Trainer",
    category: "kids",
    style: "sports",
    collection: "LMB Sport",
    tags: ["daily-wear"],
    price: 1699,
    mrp: 2199,
    rating: 4.5,
    reviewsCount: 51,
    sizes: [1, 2, 3, 4],
    colorway: "Multicolor",
    color: "Multicolor",
    colorHex: "#e0556a",
    swatch: ["#e0556a", "#f2a33a"],
    description:
      "Playful, durable trainers with extra cushioning built for busy, active days.",
  },
  {
    id: "9",
    slug: "cloudstep-runner",
    title: "CloudStep Runner",
    category: "sports",
    style: "sports",
    collection: "LMB Sport",
    tags: ["daily-wear", "bestseller", "new-arrival"],
    price: 3499,
    mrp: 4499,
    rating: 4.8,
    reviewsCount: 210,
    sizes: [6, 7, 8, 9, 10, 11],
    colorway: "Graphite Grey",
    color: "Grey",
    colorHex: "#6b7280",
    swatch: ["#3a3f47", "#6b7280"],
    description:
      "Responsive foam midsole and breathable mesh upper for long-distance comfort.",
  },
  {
    id: "10",
    slug: "apex-trail-boot",
    title: "Apex Trail Boot",
    category: "sports",
    style: "boots",
    collection: "LMB Sport",
    tags: ["daily-wear"],
    price: 4199,
    mrp: 5299,
    rating: 4.6,
    reviewsCount: 88,
    sizes: [7, 8, 9, 10, 11],
    colorway: "Forest Green",
    color: "Green",
    colorHex: "#2f4a3a",
    swatch: ["#2f4a3a", "#4f7a5f"],
    description:
      "Rugged grip outsole and reinforced ankle support built for unpredictable terrain.",
  },
  {
    id: "11",
    slug: "courtline-pro",
    title: "Courtline Pro",
    category: "sports",
    style: "sports",
    collection: "LMB Sport",
    tags: ["daily-wear", "bestseller"],
    price: 3899,
    mrp: 4899,
    rating: 4.7,
    reviewsCount: 156,
    sizes: [6, 7, 8, 9, 10],
    colorway: "White/Gold",
    color: "White",
    colorHex: "#e8e6df",
    swatch: ["#e8e6df", "#c9a227"],
    description:
      "Lateral support and a low-profile sole built for quick cuts on the court.",
  },
  {
    id: "12",
    slug: "prestige-derby-navy",
    title: "Prestige Derby",
    category: "men",
    style: "formal",
    collection: "LMB Heritage",
    tags: ["party-wear", "new-arrival"],
    price: 4299,
    mrp: 5499,
    rating: 4.5,
    reviewsCount: 71,
    sizes: [7, 8, 9, 10, 11],
    colorway: "Navy Blue",
    color: "Navy",
    colorHex: "#1c2b4a",
    swatch: ["#1c2b4a", "#33517f"],
    description:
      "A modern derby silhouette in navy calfskin leather with a stitched leather sole.",
  },
];

export function getFeaturedProducts(limit = 8) {
  return PRODUCTS.slice(0, limit);
}

export function getProductsByTag(tag: Product["tags"][number], limit?: number) {
  const list = PRODUCTS.filter((p) => p.tags.includes(tag));
  return limit ? list.slice(0, limit) : list;
}

export function getOffers(minDiscount = 20, limit = 8) {
  return sortProducts(
    PRODUCTS.filter((p) => discountPercent(p.price, p.mrp) >= minDiscount),
    "discount",
  ).slice(0, limit);
}

export const PRICE_BUCKETS = [
  { label: "Under ₹2,000", min: 0, max: 2000 },
  { label: "₹2,000 - ₹3,500", min: 2000, max: 3500 },
  { label: "₹3,500 - ₹5,000", min: 3500, max: 5000 },
  { label: "Above ₹5,000", min: 5000, max: 999999 },
] as const;

export function getProductsByCategory(category?: string) {
  if (!category) return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, limit);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.colorway.toLowerCase().includes(q),
  );
}

export function getAllColors() {
  const map = new Map<string, string>();
  for (const p of PRODUCTS) map.set(p.color, p.colorHex);
  return Array.from(map, ([name, hex]) => ({ name, hex }));
}

export function getPriceBounds() {
  const prices = PRODUCTS.map((p) => p.price);
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

export function getAllSizes() {
  const set = new Set<number>();
  for (const p of PRODUCTS) for (const s of p.sizes) set.add(s);
  return Array.from(set).sort((a, b) => a - b);
}
