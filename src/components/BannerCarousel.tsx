"use client";

import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Banner } from "@/lib/content";

export function BannerCarousel({ banners: BANNERS }: { banners: Banner[] }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setIndex((i) => (i + 1) % BANNERS.length);
  }, [BANNERS.length]);

  const prevSlide = useCallback(() => {
    setIndex((i) => (i - 1 + BANNERS.length) % BANNERS.length);
  }, [BANNERS.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    if (isPaused || BANNERS.length < 2) return;
    const id = window.setInterval(nextSlide, 5000);
    return () => window.clearInterval(id);
  }, [isPaused, nextSlide, BANNERS.length]);

  if (BANNERS.length === 0) return null;

  return (
    <section 
      className="relative overflow-hidden border-b border-white/10 bg-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative mx-auto max-w-7xl px-3 py-3 sm:px-4 sm:py-4 lg:px-8">
        <div 
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="relative min-h-[380px] sm:min-h-[360px] sm:aspect-[21/9] md:aspect-[2.4/1] overflow-hidden rounded-xl border border-white/15 bg-background-secondary shadow-2xl"
        >
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
                {hasImg && banner.image ? (
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

                {/* Directional Gradient: crisp and bright image on mobile, subtle backing on text */}
                <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-background/90 via-background/55 to-transparent" />
                <div className="sm:hidden absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 via-45% to-transparent" />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />

                {/* Content Overlay */}
                <div className="relative flex h-full flex-col justify-end pb-7 sm:justify-center px-4 sm:px-12 md:px-16 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold tracking-wider text-gold uppercase backdrop-blur-md">
                      <Sparkles className="h-3 w-3" />
                      {banner.badge}
                    </span>
                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/80">
                      • {banner.eyebrow}
                    </span>
                  </div>

                  <h2 className="mt-2 font-heading text-xl font-bold leading-snug sm:mt-3 sm:text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {banner.title}
                  </h2>

                  <p className="mt-1 text-xs text-gray-200 sm:mt-2 sm:text-sm md:text-base line-clamp-2 max-w-xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                    {banner.subtitle}
                  </p>

                  <div className="mt-4 sm:mt-6">
                    <Link
                      href={banner.href}
                      className="group inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-semibold text-background transition-all duration-300 hover:bg-gold-accent hover:shadow-[0_0_20px_rgba(201,162,39,0.5)] hover:scale-105 active:scale-95"
                    >
                      {banner.cta}
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Navigation Arrows: Hidden on mobile (swipe gestures used), visible on desktop */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-background/60 border border-white/20 text-white backdrop-blur-md transition-all hover:bg-gold hover:text-background hover:scale-110 hover:border-gold"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-background/60 border border-white/20 text-white backdrop-blur-md transition-all hover:bg-gold hover:text-background hover:scale-110 hover:border-gold"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="mt-3 sm:mt-4 flex items-center justify-center gap-1.5 sm:gap-2">
          {BANNERS.map((b, i) => (
            <button
              key={b.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 sm:h-2 rounded-full transition-all duration-300",
                i === index ? "w-6 sm:w-8 bg-gold shadow-[0_0_8px_rgba(201,162,39,0.6)]" : "w-1.5 sm:w-2 bg-white/30 hover:bg-white/60",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

