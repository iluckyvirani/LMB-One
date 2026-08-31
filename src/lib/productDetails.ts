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
