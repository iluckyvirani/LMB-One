import type { Product, Style } from "@/lib/types";

export function footLengthCm(size: number) {
  return Math.round((19.9 + size * 0.85) * 10) / 10;
}

function resolveUpperMaterial(product: Product): string {
  const t = product.title.toLowerCase();
  const d = (product.description ?? "").toLowerCase();
  if (t.includes("velvet") || d.includes("velvet")) return "Plush Velvet & Embroidered Crest";
  if (t.includes("suede") || d.includes("suede")) return "Premium Soft Suede Leather";
  if (t.includes("satin") || d.includes("satin")) return "Fine Italian Satin & Silk Blend";
  if (t.includes("crystal") || d.includes("glitter") || t.includes("sparkle")) return "Glitter Mesh & Crystal Embellishment";
  if (t.includes("runner") || t.includes("sprint") || t.includes("trainer") || product.category === "sports") return "Dual-layer Breathable Flyknit & TPU Overlays";
  if (t.includes("boot") || t.includes("oxford") || t.includes("brogue") || t.includes("derby") || t.includes("monk")) return "Full-Grain Hand-Burnished Calfskin Leather";
  if (product.collection === "LMB Heritage") return "Full-Grain Handcrafted Leather";
  if (product.collection === "LMB Édition") return "Luxe Glove Leather & Metallic Finishes";
  return "Premium Genuine Leather";
}

function resolveSoleMaterial(product: Product): string {
  if (product.category === "sports" || product.style === "sports") return "High-Traction Vulcanized Rubber & Responsive Foam";
  if (product.style === "boots") return "Goodyear-Welted Chevron Lug Rubber Sole";
  if (product.style === "formal") return "Handcrafted Stitched Leather & Rubber Heel Cap";
  if (product.style === "heels") return "Reinforced Anti-Slip Resin & Stiletto Stem";
  if (product.style === "sandals") return "Ergonomic Memory-Foam Footbed & Flexible Rubber Outsole";
  return "Flexible Anti-Slip TPR Rubber Sole";
}

export function getProductSpecs(product: Product) {
  const upper = resolveUpperMaterial(product);
  const sole = resolveSoleMaterial(product);

  const baseSpecs = [
    { label: "Collection", value: product.collection },
    { label: "Upper Material", value: upper },
    { label: "Insole & Lining", value: "Cushioned Memory Foam with Moisture-Wicking Lining" },
    { label: "Sole Material", value: sole },
    { label: "Closure", value: product.style === "casual" || product.style === "flats" ? "Slip-On" : product.style === "sandals" ? "Adjustable Ankle Strap" : "Lace-Up" },
    { label: "Colorway", value: product.colorway || product.color },
    { label: "Country of Origin", value: "Handcrafted in India" },
    { label: "Warranty", value: "60 Days Brand Warranty on Craftsmanship" },
    { label: "Package Contains", value: "1 Pair of Shoes, Dust Bag, Authenticity Card" },
    { label: "Care Instructions", value: "Clean with a soft dry cloth; avoid soaking in water" },
  ];

  return baseSpecs;
}
