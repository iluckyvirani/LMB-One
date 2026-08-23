import type { Product, Style } from "@/lib/types";

export function footLengthCm(size: number) {
  return Math.round((19.9 + size * 0.85) * 10) / 10;
}

const STYLE_SPECS: Record<Style, { label: string; value: string }[]> = {
  formal: [
    { label: "Closure", value: "Lace-Up" },
    { label: "Sole Material", value: "Leather" },
    { label: "Ankle Height", value: "Regular" },
    { label: "Cushioning", value: "Medium" },
  ],
  casual: [
    { label: "Closure", value: "Slip-On" },
    { label: "Sole Material", value: "Rubber" },
    { label: "Ankle Height", value: "Regular" },
    { label: "Cushioning", value: "Medium" },
  ],
  heels: [
    { label: "Heel Height", value: "3 inches" },
    { label: "Heel Type", value: "Stiletto" },
    { label: "Closure", value: "Slip-On" },
    { label: "Cushioning", value: "Medium" },
  ],
  flats: [
    { label: "Closure", value: "Slip-On" },
    { label: "Sole Material", value: "Rubber" },
    { label: "Toe Shape", value: "Round Toe" },
    { label: "Cushioning", value: "Medium" },
  ],
  sandals: [
    { label: "Closure", value: "Buckle" },
    { label: "Sole Material", value: "Rubber" },
    { label: "Heel Type", value: "Flat" },
    { label: "Cushioning", value: "Medium" },
  ],
  sports: [
    { label: "Fastening", value: "Lace-Ups" },
    { label: "Outsole Type", value: "Marking" },
    { label: "Arch Type", value: "Medium" },
    { label: "Cushioning", value: "High" },
  ],
  boots: [
    { label: "Closure", value: "Lace-Up" },
    { label: "Ankle Height", value: "High" },
    { label: "Outsole Type", value: "Grip" },
    { label: "Cushioning", value: "High" },
  ],
};

export function getProductSpecs(product: Product) {
  return [
    ...STYLE_SPECS[product.style],
    { label: "Warranty", value: "30 days" },
    { label: "Package Contains", value: "1 pair of shoes" },
    { label: "Care", value: "Wipe with a clean, dry cloth" },
  ];
}

const RATING_TEMPLATES = [
  { min: 4.7, weights: [0.78, 0.15, 0.04, 0.02, 0.01] },
  { min: 4.4, weights: [0.68, 0.2, 0.06, 0.03, 0.03] },
  { min: 4.0, weights: [0.58, 0.24, 0.09, 0.05, 0.04] },
  { min: 0, weights: [0.48, 0.25, 0.13, 0.08, 0.06] },
];

export function getRatingBreakdown(product: Product) {
  const template =
    RATING_TEMPLATES.find((t) => product.rating >= t.min) ??
    RATING_TEMPLATES[RATING_TEMPLATES.length - 1];
  const counts = template.weights.map((w) => Math.round(w * product.reviewsCount));
  const diff = product.reviewsCount - counts.reduce((a, b) => a + b, 0);
  counts[0] += diff;
  return [5, 4, 3, 2, 1].map((stars, i) => ({ stars, count: Math.max(0, counts[i]) }));
}

const REVIEW_POOL = [
  {
    name: "Rohan K.",
    rating: 5,
    text: "Super comfortable right out of the box, no break-in period needed. True to size and the finish looks premium.",
  },
  {
    name: "Ishita V.",
    rating: 4,
    text: "Great value for the price. Fits as expected — ordered my usual size and it was perfect.",
  },
  {
    name: "Aditya S.",
    rating: 5,
    text: "Been wearing these daily for three weeks now, holding up really well. Would recommend to a friend.",
  },
  {
    name: "Meera P.",
    rating: 4,
    text: "Good quality and quick delivery. Slightly snug at first but comfortable after a day of wear.",
  },
];

export function getProductReviews(product: Product) {
  const seed = Number(product.id);
  const a = REVIEW_POOL[seed % REVIEW_POOL.length];
  const b = REVIEW_POOL[(seed + 2) % REVIEW_POOL.length];
  return [a, b];
}

export const BANK_OFFERS = [
  {
    title: "10% Instant Discount on HDFC Bank Credit Card",
    detail: "Min Spend ₹3,500, Max Discount ₹1,200",
  },
  {
    title: "10% Instant Discount on Kotak Bank Credit Card EMI",
    detail: "Min Spend ₹3,500, Max Discount ₹1,000",
  },
  {
    title: "Flat 5% Cashback on LMB-One Shoes Store Card",
    detail: "On a minimum spend of ₹1,000",
  },
] as const;
