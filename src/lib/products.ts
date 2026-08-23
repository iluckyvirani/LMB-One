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
    rating: 4.8,
    reviewsCount: 184,
    sizes: [7, 8, 9, 10, 11],
    colorway: "Midnight Black",
    color: "Black",
    colorHex: "#1a1a1a",
    swatch: ["#1a1a1a", "#3a3a3a"],
    image: "/products/regal-oxford.jpg",
    images: [
      "/products/regal-oxford.jpg",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
    ],
    description:
      "Handcrafted leather Oxfords with a sleek silhouette and polished patina — built for boardrooms, black-tie galas, and momentous celebrations.",
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
    rating: 4.6,
    reviewsCount: 112,
    sizes: [7, 8, 9, 10, 11, 12],
    colorway: "Tan Brown",
    color: "Tan",
    colorHex: "#8a5a34",
    swatch: ["#8a5a34", "#c99a6a"],
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop",
      "/products/regal-oxford.jpg",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=800&auto=format&fit=crop",
    ],
    description:
      "Classic wingtip brogue detailing on premium hand-burnished leather with a cushioned insole engineered for round-the-clock comfort.",
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
    mrp: 4499,
    rating: 4.7,
    reviewsCount: 89,
    sizes: [7, 8, 9, 10],
    colorway: "Royal Burgundy",
    color: "Burgundy",
    colorHex: "#5c1a2b",
    swatch: ["#5c1a2b", "#8c2f45"],
    image: "/products/velvet-loafer.jpg",
    images: [
      "/products/velvet-loafer.jpg",
      "https://images.unsplash.com/photo-1582895181286-578d8280f5b9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop",
      "/products/regal-oxford.jpg",
    ],
    description:
      "Slip-on plush velvet smoking loafers finished with intricate bullion gold crest embroidery for an unforgettable statement evening look.",
  },
  {
    id: "4",
    slug: "aurora-heel-nude",
    title: "Aurora Crystal Heel",
    category: "women",
    style: "heels",
    collection: "LMB Édition",
    tags: ["party-wear", "bestseller"],
    price: 3799,
    mrp: 4999,
    rating: 4.9,
    reviewsCount: 236,
    sizes: [5, 6, 7, 8, 9],
    colorway: "Nude Blush / Rose Gold",
    color: "Blush",
    colorHex: "#d9b8a3",
    swatch: ["#d9b8a3", "#f0d9c8"],
    image: "/products/aurora-heel.jpg",
    images: [
      "/products/aurora-heel.jpg",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=800&auto=format&fit=crop",
      "/products/gilded-sandal.jpg",
    ],
    description:
      "A slender 3.5-inch stiletto pump in soft Italian satin, accented with a dazzling crystal buckle brooch designed for pure red-carpet glamour.",
  },
  {
    id: "5",
    slug: "gilded-strap-sandal",
    title: "Gilded Strappy Sandal",
    category: "women",
    style: "sandals",
    collection: "LMB Édition",
    tags: ["party-wear", "new-arrival"],
    price: 2999,
    mrp: 3999,
    rating: 4.8,
    reviewsCount: 145,
    sizes: [5, 6, 7, 8],
    colorway: "Champagne Gold",
    color: "Gold",
    colorHex: "#c9a227",
    swatch: ["#c9a227", "#e8cf7a"],
    image: "/products/gilded-sandal.jpg",
    images: [
      "/products/gilded-sandal.jpg",
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=800&auto=format&fit=crop",
      "/products/aurora-heel.jpg",
    ],
    description:
      "Sculptural metallic straps with delicate ankle fastening and padded memory-foam arch support for day-to-night celebratory wear.",
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
    mrp: 2999,
    rating: 4.5,
    reviewsCount: 98,
    sizes: [5, 6, 7, 8, 9],
    colorway: "Ivory Pearl",
    color: "Ivory",
    colorHex: "#efe9de",
    swatch: ["#efe9de", "#d8cfbb"],
    image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=800&auto=format&fit=crop",
      "/products/aurora-heel.jpg",
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=800&auto=format&fit=crop",
    ],
    description:
      "Supple satin ballet flats with a rounded toe and flexible anti-slip sole, providing timeless grace and lightweight ease.",
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
    rating: 4.7,
    reviewsCount: 92,
    sizes: [1, 2, 3, 4, 5],
    colorway: "Sky Blue & Orange",
    color: "Blue",
    colorHex: "#3f6fb0",
    swatch: ["#3f6fb0", "#8fb4e0"],
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop",
    ],
    description:
      "Ultra-durable, breathable kids' sneakers equipped with an easy hook-and-loop strap and high-traction rubber outsole.",
  },
  {
    id: "8",
    slug: "rainbow-trainer",
    title: "Rainbow Burst Trainer",
    category: "kids",
    style: "sports",
    collection: "LMB Sport",
    tags: ["daily-wear"],
    price: 1699,
    mrp: 2299,
    rating: 4.6,
    reviewsCount: 78,
    sizes: [1, 2, 3, 4],
    colorway: "Multicolor Brights",
    color: "Multicolor",
    colorHex: "#e0556a",
    swatch: ["#e0556a", "#f2a33a"],
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop",
    ],
    description:
      "Playful vibrant trainers engineered with bounce-back foam cushioning to support every hop, skip, and playground adventure.",
  },
  {
    id: "9",
    slug: "cloudstep-runner",
    title: "CloudStep RS Runner",
    category: "sports",
    style: "sports",
    collection: "LMB Sport",
    tags: ["daily-wear", "bestseller", "new-arrival"],
    price: 3499,
    mrp: 4699,
    rating: 4.9,
    reviewsCount: 310,
    sizes: [6, 7, 8, 9, 10, 11],
    colorway: "Cyan & Volt Green",
    color: "Grey",
    colorHex: "#1f2937",
    swatch: ["#103524", "#0df2c9"],
    image: "/products/cloudstep-runner.jpg",
    images: [
      "/products/cloudstep-runner.jpg",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=800&auto=format&fit=crop",
    ],
    description:
      "Next-generation responsive speed foam midsole and engineered dual-layer mesh upper designed for marathon comfort and explosive energy return.",
  },
  {
    id: "10",
    slug: "apex-trail-boot",
    title: "Apex Waterproof Trail Boot",
    category: "sports",
    style: "boots",
    collection: "LMB Sport",
    tags: ["daily-wear"],
    price: 4199,
    mrp: 5499,
    rating: 4.7,
    reviewsCount: 118,
    sizes: [7, 8, 9, 10, 11],
    colorway: "Forest Green & Earth",
    color: "Green",
    colorHex: "#2f4a3a",
    swatch: ["#2f4a3a", "#4f7a5f"],
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800&auto=format&fit=crop",
      "/products/heritage-chelsea.jpg",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop",
      "/products/cloudstep-runner.jpg",
    ],
    description:
      "All-weather rugged outdoor boot with deep chevron lugs, reinforced TPU toe bumper, and waterproof membrane for mountain trails.",
  },
  {
    id: "11",
    slug: "courtline-pro",
    title: "Courtline Pro Sneaker",
    category: "sports",
    style: "sports",
    collection: "LMB Sport",
    tags: ["daily-wear", "bestseller"],
    price: 3899,
    mrp: 4999,
    rating: 4.8,
    reviewsCount: 195,
    sizes: [6, 7, 8, 9, 10],
    colorway: "Chalk White & Gold",
    color: "White",
    colorHex: "#e8e6df",
    swatch: ["#e8e6df", "#c9a227"],
    image: "/products/courtline-pro.jpg",
    images: [
      "/products/courtline-pro.jpg",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512374382149-233c42b661ac?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop",
    ],
    description:
      "Low-profile court silhouette in buttery calf leather with metallic embossed branding and a vulcanized rubber cupsole.",
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
    mrp: 5699,
    rating: 4.6,
    reviewsCount: 95,
    sizes: [7, 8, 9, 10, 11],
    colorway: "Midnight Navy",
    color: "Navy",
    colorHex: "#1c2b4a",
    swatch: ["#1c2b4a", "#33517f"],
    image: "https://images.unsplash.com/photo-1582895181286-578d8280f5b9?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1582895181286-578d8280f5b9?q=80&w=800&auto=format&fit=crop",
      "/products/regal-oxford.jpg",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop",
      "/products/velvet-loafer.jpg",
    ],
    description:
      "Contemporary open-lacing Derby shoe crafted in rich navy calfskin, finished with edge-burnished details and a stacked wooden heel.",
  },
  {
    id: "13",
    slug: "chelsea-sovereign-cognac",
    title: "Sovereign Chelsea Boot",
    category: "men",
    style: "boots",
    collection: "LMB Heritage",
    tags: ["daily-wear", "bestseller"],
    price: 4899,
    mrp: 6499,
    rating: 4.9,
    reviewsCount: 220,
    sizes: [7, 8, 9, 10, 11, 12],
    colorway: "Cognac Brown",
    color: "Tan",
    colorHex: "#78350f",
    swatch: ["#78350f", "#b45309"],
    image: "/products/heritage-chelsea.jpg",
    images: [
      "/products/heritage-chelsea.jpg",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop",
      "/products/regal-oxford.jpg",
    ],
    description:
      "Iconic pull-on Chelsea boots in full-grain oiled leather with flexible elastic side panels and durable Goodyear welt construction.",
  },
  {
    id: "14",
    slug: "double-monk-espresso",
    title: "Monk Strap Executive",
    category: "men",
    style: "formal",
    collection: "LMB Heritage",
    tags: ["party-wear"],
    price: 4399,
    mrp: 5799,
    rating: 4.7,
    reviewsCount: 84,
    sizes: [7, 8, 9, 10, 11],
    colorway: "Espresso Brown",
    color: "Tan",
    colorHex: "#451a03",
    swatch: ["#451a03", "#78350f"],
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=800&auto=format&fit=crop",
      "/products/regal-oxford.jpg",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop",
      "/products/velvet-loafer.jpg",
    ],
    description:
      "Double buckle brass monk straps that elevate any bespoke suit with sharp toe cap geometry and hand-finished gloss.",
  },
  {
    id: "15",
    slug: "riviera-suede-loafer",
    title: "Riviera Driving Loafer",
    category: "men",
    style: "casual",
    collection: "LMB Heritage",
    tags: ["daily-wear", "new-arrival"],
    price: 3199,
    mrp: 4199,
    rating: 4.6,
    reviewsCount: 104,
    sizes: [7, 8, 9, 10, 11],
    colorway: "Camel Suede",
    color: "Tan",
    colorHex: "#b45309",
    swatch: ["#b45309", "#d97706"],
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop",
      "/products/velvet-loafer.jpg",
      "/products/regal-oxford.jpg",
      "https://images.unsplash.com/photo-1582895181286-578d8280f5b9?q=80&w=800&auto=format&fit=crop",
    ],
    description:
      "Ultra-soft suede driving moccasin with pebble-studded rubber sole for effortless weekend sophistication and relaxed luxury.",
  },
  {
    id: "16",
    slug: "scarlet-velvet-stiletto",
    title: "Scarlet Velvet Stiletto",
    category: "women",
    style: "heels",
    collection: "LMB Édition",
    tags: ["party-wear", "new-arrival"],
    price: 3999,
    mrp: 5299,
    rating: 4.8,
    reviewsCount: 167,
    sizes: [5, 6, 7, 8, 9],
    colorway: "Crimson Red Velvet",
    color: "Burgundy",
    colorHex: "#881337",
    swatch: ["#881337", "#be123c"],
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=800&auto=format&fit=crop",
      "/products/aurora-heel.jpg",
      "/products/gilded-sandal.jpg",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=800&auto=format&fit=crop",
    ],
    description:
      "Deep crimson velvet pointed-toe heels with gold-leaf accents along the slim 4-inch stiletto stem.",
  },
  {
    id: "17",
    slug: "crystal-evening-pump",
    title: "Gala Crystal Pump",
    category: "women",
    style: "heels",
    collection: "LMB Édition",
    tags: ["party-wear", "bestseller"],
    price: 3699,
    mrp: 4799,
    rating: 4.9,
    reviewsCount: 188,
    sizes: [5, 6, 7, 8],
    colorway: "Champagne Shimmer",
    color: "Gold",
    colorHex: "#ca8a04",
    swatch: ["#ca8a04", "#eab308"],
    image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=800&auto=format&fit=crop",
      "/products/aurora-heel.jpg",
      "/products/gilded-sandal.jpg",
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=800&auto=format&fit=crop",
    ],
    description:
      "Glittering evening pumps crowned with an emerald-cut crystal jewel, tailored for weddings and festive galas.",
  },
  {
    id: "18",
    slug: "astrid-pointed-mule",
    title: "Astrid Pointed Mule",
    category: "women",
    style: "flats",
    collection: "LMB Édition",
    tags: ["daily-wear", "new-arrival"],
    price: 2499,
    mrp: 3299,
    rating: 4.6,
    reviewsCount: 82,
    sizes: [5, 6, 7, 8, 9],
    colorway: "Onyx Black Leather",
    color: "Black",
    colorHex: "#09090b",
    swatch: ["#09090b", "#27272a"],
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=800&auto=format&fit=crop",
      "/products/aurora-heel.jpg",
      "/products/gilded-sandal.jpg",
    ],
    description:
      "Minimalist backless pointed mules in smooth glove leather, offering easy slip-on comfort and sleek modern styling.",
  },
  {
    id: "19",
    slug: "palermo-wedge-sandal",
    title: "Palermo Espadrille Wedge",
    category: "women",
    style: "sandals",
    collection: "LMB Édition",
    tags: ["daily-wear"],
    price: 2799,
    mrp: 3699,
    rating: 4.5,
    reviewsCount: 94,
    sizes: [5, 6, 7, 8],
    colorway: "Terracotta Tan",
    color: "Tan",
    colorHex: "#9a3412",
    swatch: ["#9a3412", "#ea580c"],
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
      "/products/gilded-sandal.jpg",
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=800&auto=format&fit=crop",
      "/products/aurora-heel.jpg",
    ],
    description:
      "Jute-wrapped woven espadrille wedge with supple leather criss-cross straps for breezy warm-weather elegance.",
  },
  {
    id: "20",
    slug: "sienna-leather-ankle-boot",
    title: "Sienna Leather Ankle Boot",
    category: "women",
    style: "boots",
    collection: "LMB Édition",
    tags: ["daily-wear", "bestseller"],
    price: 4299,
    mrp: 5599,
    rating: 4.8,
    reviewsCount: 162,
    sizes: [5, 6, 7, 8, 9],
    colorway: "Warm Chestnut",
    color: "Tan",
    colorHex: "#7c2d12",
    swatch: ["#7c2d12", "#c2410c"],
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=800&auto=format&fit=crop",
      "/products/heritage-chelsea.jpg",
      "/products/aurora-heel.jpg",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800&auto=format&fit=crop",
    ],
    description:
      "Chic block-heel ankle boot cut in rich burnished leather with gold side zip hardware and an all-day comfort sole.",
  },
  {
    id: "21",
    slug: "nitro-zoom-sprint",
    title: "Nitro Zoom Sprint",
    category: "sports",
    style: "sports",
    collection: "LMB Sport",
    tags: ["daily-wear", "new-arrival"],
    price: 3699,
    mrp: 4899,
    rating: 4.8,
    reviewsCount: 240,
    sizes: [6, 7, 8, 9, 10, 11],
    colorway: "Crimson Red / Black",
    color: "Red",
    colorHex: "#dc2626",
    swatch: ["#dc2626", "#1e293b"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
      "/products/cloudstep-runner.jpg",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop",
      "/products/courtline-pro.jpg",
    ],
    description:
      "Explosive carbon-infused propulsion plate and breathable dynamic flyknit upper built for personal speed records.",
  },
  {
    id: "22",
    slug: "viper-neon-trainer",
    title: "Viper Neon Volt Trainer",
    category: "sports",
    style: "sports",
    collection: "LMB Sport",
    tags: ["daily-wear", "bestseller"],
    price: 3299,
    mrp: 4299,
    rating: 4.7,
    reviewsCount: 176,
    sizes: [6, 7, 8, 9, 10],
    colorway: "Electric Neon Lime",
    color: "Green",
    colorHex: "#84cc16",
    swatch: ["#84cc16", "#14532d"],
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop",
      "/products/cloudstep-runner.jpg",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
      "/products/courtline-pro.jpg",
    ],
    description:
      "High-visibility athletic trainer with ultra-responsive dual-density foam designed for HIIT, gym training, and road runs.",
  },
  {
    id: "23",
    slug: "aero-lite-cushioned-sneaker",
    title: "Aero Lite Pastel Sneaker",
    category: "sports",
    style: "casual",
    collection: "LMB Sport",
    tags: ["daily-wear", "bestseller"],
    price: 2899,
    mrp: 3799,
    rating: 4.7,
    reviewsCount: 135,
    sizes: [5, 6, 7, 8, 9, 10],
    colorway: "Pastel Lavender & Mint",
    color: "Multicolor",
    colorHex: "#a855f7",
    swatch: ["#a855f7", "#06b6d4"],
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
      "/products/courtline-pro.jpg",
      "/products/cloudstep-runner.jpg",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop",
    ],
    description:
      "Featherweight lifestyle sneaker with cushioned arch support, clean pastel color blocking, and breathable mesh zones.",
  },
  {
    id: "24",
    slug: "star-cadet-high-top",
    title: "Star Cadet High-Top",
    category: "kids",
    style: "casual",
    collection: "LMB Sport",
    tags: ["daily-wear", "bestseller"],
    price: 1799,
    mrp: 2399,
    rating: 4.8,
    reviewsCount: 110,
    sizes: [1, 2, 3, 4, 5],
    colorway: "Denim Blue & Coral",
    color: "Blue",
    colorHex: "#1d4ed8",
    swatch: ["#1d4ed8", "#f97316"],
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop",
    ],
    description:
      "Padded collar high-top sneaker for kids, featuring reinforced toe cap, cushioned ankle support, and easy side zipper.",
  },
  {
    id: "25",
    slug: "comfy-glide-slip-on",
    title: "Comfy Glide Slip-On",
    category: "kids",
    style: "casual",
    collection: "LMB Sport",
    tags: ["daily-wear"],
    price: 1399,
    mrp: 1899,
    rating: 4.6,
    reviewsCount: 64,
    sizes: [1, 2, 3, 4],
    colorway: "Charcoal & Lime",
    color: "Grey",
    colorHex: "#475569",
    swatch: ["#475569", "#84cc16"],
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
    ],
    description:
      "Easy slip-on stretch knit sneakers made for quick mornings, active school days, and lightweight all-day comfort.",
  },
  {
    id: "26",
    slug: "sparkle-step-party-shoes",
    title: "Sparkle Step Ballerina",
    category: "kids",
    style: "flats",
    collection: "LMB Édition",
    tags: ["party-wear", "new-arrival"],
    price: 1699,
    mrp: 2299,
    rating: 4.8,
    reviewsCount: 88,
    sizes: [1, 2, 3, 4],
    colorway: "Rose Gold Glitter",
    color: "Gold",
    colorHex: "#fb7185",
    swatch: ["#fb7185", "#fde047"],
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop",
    ],
    description:
      "Dazzling glitter ballerinas for young princesses with a cushioned foam insole and elastic instep band for secure fit.",
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
      p.colorway.toLowerCase().includes(q) ||
      p.style.toLowerCase().includes(q) ||
      p.collection.toLowerCase().includes(q),
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
