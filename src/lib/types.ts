export type Category = "men" | "women" | "kids" | "sports";

export type Style =
  | "formal"
  | "casual"
  | "heels"
  | "flats"
  | "sandals"
  | "sports"
  | "boots";

export type Collection = "LMB Heritage" | "LMB Édition" | "LMB Sport";

export type Tag = "new-arrival" | "bestseller" | "party-wear" | "daily-wear";

export type Product = {
  id: string;
  slug: string;
  title: string;
  category: Category;
  style: Style;
  collection: Collection;
  tags: Tag[];
  price: number;
  mrp: number;
  rating: number;
  reviewsCount: number;
  sizes: number[];
  colorway: string;
  color: string;
  colorHex: string;
  swatch: [string, string];
  description: string;
  image?: string;
  images?: string[];
};

