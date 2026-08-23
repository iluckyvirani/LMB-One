"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const BANNERS = [
  {
    id: 1,
    href: "/shop?tag=new-arrival",
    swatch: ["#1a1a1a", "#3a3a3a"] as const,
    eyebrow: "New Arrivals",
    title: "Handcrafted leather, made for the modern man",
    subtitle: "Fresh drops this week — up to 25% off",
  },
  {
    id: 2,
    href: "/shop?tag=party-wear",
    swatch: ["#5c1a2b", "#c9a227"] as const,
    eyebrow: "Party Wear",
    title: "Heels, loafers & sandals for the big night",
    subtitle: "Curated styles for every occasion",
  },
  {
    id: 3,
    href: "/shop",
    swatch: ["#c9a227", "#8a5a34"] as const,
    eyebrow: "Limited Time",
    title: "Flat 25% off on our best-loved styles",
    subtitle: "Ends soon — sort by Better Discount to grab yours",
  },
  {
    id: 4,
    href: "/shop?category=sports",
    swatch: ["#2f4a3a", "#4f7a5f"] as const,
    eyebrow: "Performance",
    title: "Built to move — CloudStep runners are here",
    subtitle: "Responsive comfort for every stride",
  },
  {
    id: 5,
    href: "/shop?category=kids",
    swatch: ["#3f6fb0", "#e0556a"] as const,
    eyebrow: "Little Feet",
    title: "Playful trainers built for busy days",
    subtitle: "Durable, breathable, easy on-off",
  },
];

export function BannerCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % BANNERS.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="relative mx-auto max-w-7xl px-4 py-4 lg:px-8">
        <div className="relative aspect-[21/9] min-h-[200px] overflow-hidden bg-background-secondary sm:min-h-[240px] md:aspect-[3/1]">
          {BANNERS.map((banner, i) => (
            <Link
              key={banner.id}
              href={banner.href}
              className={cn(
                "absolute inset-0 transition-opacity duration-700",
                i === index ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              aria-hidden={i !== index}
              style={{
                background: `linear-gradient(120deg, ${banner.swatch[0]}, ${banner.swatch[1]})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
                <p className="text-xs tracking-[0.3em] text-gold uppercase">
                  {banner.eyebrow}
                </p>
                <h2 className="mt-2 max-w-lg font-heading text-2xl text-white sm:text-4xl">
                  {banner.title}
                </h2>
                <p className="mt-2 max-w-md text-sm text-muted sm:text-base">
                  {banner.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-2">
          {BANNERS.map((b, i) => (
            <button
              key={b.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-all",
                i === index ? "w-5 bg-gold" : "bg-white/30 hover:bg-white/50",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
