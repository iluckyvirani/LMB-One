export const BRAND = {
  name: "LMB-One Shoes",
  shortName: "LMB-One Shoes",
  storeName: "LMB-One Shoes",
  tagline: "Step into luxury",
  description:
    "LMB-One Shoes is a premium e-commerce store for footwear — curated styles, quality craftsmanship, delivered to your door.",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Shop",
    links: [
      { href: "/shop?category=men", label: "Men" },
      { href: "/shop?category=women", label: "Women" },
      { href: "/shop?category=kids", label: "Kids" },
      { href: "/shop?category=sports", label: "Sports" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
] as const;
