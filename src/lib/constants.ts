export const BRAND = {
  name: "LMB Shoes",
  shortName: "LMB Shoes",
  storeName: "LMB Shoes",
  tagline: "Step into luxury",
  description:
    "LMB Shoes is a bespoke luxury footwear house engineered for peerless comfort, handcrafted Italian leathers, and modern sartorial distinction.",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/size-guide", label: "Size Guide" },
  { href: "/track-order", label: "Track Order" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Shop Footwear",
    links: [
      { href: "/shop?category=men", label: "Men's Footwear" },
      { href: "/shop?category=women", label: "Women's Collection" },
      { href: "/shop?category=kids", label: "Kids' Active" },
      { href: "/shop?category=sports", label: "Sports & Performance" },
      { href: "/shop?tag=new-arrival", label: "New Arrivals" },
      { href: "/shop?tag=bestseller", label: "Best Sellers" },
    ],
  },
  {
    title: "Customer Concierge",
    links: [
      { href: "/track-order", label: "Track Your Order" },
      { href: "/size-guide", label: "Size & Fit Guide" },
      { href: "/returns-refunds", label: "7-Day Free Exchange" },
      { href: "/shipping-policy", label: "Shipping & Delivery" },
      { href: "/faqs", label: "Frequently Asked Questions" },
      { href: "/contact", label: "Customer Support" },
    ],
  },
  {
    title: "Company & Legal",
    links: [
      { href: "/about", label: "Our Story & Heritage" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
] as const;
