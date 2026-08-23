"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const BANNERS = [
  {
    id: 1,
    href: "/shop?tag=new-arrival",
    image: "/banners/hero-luxury-oxford.jpg",
    swatch: ["#1a1a1a", "#3a3a3a"] as const,
    badge: "Heritage Collection",
    eyebrow: "New Arrivals 2026",
    title: "Handcrafted Luxury Leather, Made For The Modern Connoisseur",
    subtitle: "Artisanal silhouettes cut from full-grain calfskin — special introductory prices.",
    cta: "Explore Collection",
  },
  {
    id: 2,
    href: "/shop?tag=party-wear",
    image: "/banners/hero-party-heels.jpg",
    swatch: ["#5c1a2b", "#c9a227"] as const,
    badge: "The Gala Édition",
    eyebrow: "Party & Evening Wear",
    title: "Velvet Elegance & Gilded Heels For The Grand Night",
    subtitle: "Turn heads with handcrafted stilettos, smoking loafers & embellished party sandals.",
    cta: "Shop Evening Edit",
  },
  {
    id: 3,
    href: "/shop?category=sports",
    image: "/banners/hero-sports-runner.jpg",
    swatch: ["#103524", "#0df2c9"] as const,
    badge: "Performance Lab",
    eyebrow: "Limitless Momentum",
    title: "CloudStep & Nitro Series — Engineered For Speed",
    subtitle: "Ultra-responsive dynamic cushioning and breathable mesh for effortless strides.",
    cta: "Discover Sports",
  },
  {
    id: 4,
    href: "/shop?category=kids",
    image: "/banners/hero-kids-sneakers.jpg",
    swatch: ["#3f6fb0", "#e0556a"] as const,
    badge: "Little Feet",
    eyebrow: "Youth & Toddlers",
    title: "Playful Steps & Bold Cushioning For Young Explorers",
    subtitle: "Durable, featherlight, and non-slip trainers designed for active all-day fun.",
    cta: "Shop Kids Collection",
  },
  {
    id: 5,
    href: "/shop",
    image: "/banners/hero-season-sale.jpg",
    swatch: ["#2d1b0e", "#c9a227"] as const,
    badge: "Limited Season Event",
    eyebrow: "Artisan Craftsmanship",
    title: "Flat 25% Off Iconic Goodyear-Welted Footwear",
    subtitle: "Unmatched durability meets timeless British & Italian bespoke craftsmanship.",
    cta: "Claim Your Discount",
  },
];

export function BannerCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  const nextSlide = useCallback(() => {
    setIndex((i) => (i + 1) % BANNERS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setIndex((i) => (i - 1 + BANNERS.length) % BANNERS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = window.setInterval(nextSlide, 5000);
    return () => window.clearInterval(id);
  }, [isPaused, nextSlide]);

  return (
    <section 
      className="relative overflow-hidden border-b border-white/10 bg-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative mx-auto max-w-7xl px-4 py-4 lg:px-8">
        <div className="relative aspect-[16/9] min-h-[300px] overflow-hidden rounded-xl border border-white/15 bg-background-secondary shadow-2xl sm:aspect-[21/9] sm:min-h-[360px] md:aspect-[2.4/1]">
          {BANNERS.map((banner, i) => {
            const isActive = i === index;
            const hasImg = banner.image && !imgError[banner.id];

            return (
              <div
                key={banner.id}
                className={cn(
                  "absolute inset-0 transition-all duration-1000 ease-in-out",
                  isActive
                    ? "opacity-100 scale-100 z-10"
                    : "pointer-events-none opacity-0 scale-105 z-0",
                )}
                aria-hidden={!isActive}
              >
                {/* Background Image / Gradient */}
                {hasImg ? (
                  <img
                    src={banner.image}
                    alt={banner.title}
                    onError={() => setImgError((prev) => ({ ...prev, [banner.id]: true }))}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[6000ms] ease-out"
                    style={{
                      transform: isActive ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${banner.swatch[0]}, ${banner.swatch[1]})`,
                    }}
                  />
                )}

                {/* Dark Vignette / Gradient Overlays for High Legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent sm:via-background/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-black/30" />

                {/* Content Overlay */}
                <div className="relative flex h-full flex-col justify-center px-6 sm:px-12 md:px-16 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-[11px] font-semibold tracking-wider text-gold uppercase backdrop-blur-md">
                      <Sparkles className="h-3 w-3" />
                      {banner.badge}
                    </span>
                    <span className="hidden sm:inline-block text-xs uppercase tracking-[0.25em] text-white/70">
                      • {banner.eyebrow}
                    </span>
                  </div>

                  <h2 className="mt-3 font-heading text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-md">
                    {banner.title}
                  </h2>

                  <p className="mt-2 text-sm text-gray-300 sm:mt-3 sm:text-base md:text-lg line-clamp-2 max-w-xl">
                    {banner.subtitle}
                  </p>

                  <div className="mt-5 sm:mt-6">
                    <Link
                      href={banner.href}
                      className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-semibold text-background transition-all duration-300 hover:bg-gold-accent hover:shadow-[0_0_20px_rgba(201,162,39,0.5)] hover:scale-105"
                    >
                      {banner.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-background/60 border border-white/20 text-white backdrop-blur-md transition-all hover:bg-gold hover:text-background hover:scale-110 hover:border-gold"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-background/60 border border-white/20 text-white backdrop-blur-md transition-all hover:bg-gold hover:text-background hover:scale-110 hover:border-gold"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {BANNERS.map((b, i) => (
            <button
              key={b.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-gold shadow-[0_0_8px_rgba(201,162,39,0.6)]" : "w-2 bg-white/30 hover:bg-white/60",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

