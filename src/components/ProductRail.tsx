"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

export function ProductRail({
  title,
  href,
  products,
}: {
  title: string;
  href?: string;
  products: Product[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!products.length) return null;

  function scroll(offset: number) {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  }

  return (
    <section className="group/rail relative py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-3">
          <h2 className="font-heading text-2xl text-white md:text-3xl">{title}</h2>
          <div className="flex items-center gap-3">
            {href && (
              <Link
                href={href}
                className="text-sm text-gold transition-colors hover:text-gold-accent"
              >
                View all →
              </Link>
            )}
            <div className="hidden items-center gap-1 sm:flex">
              <button
                type="button"
                onClick={() => scroll(-340)}
                aria-label="Scroll left"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-background text-muted transition-colors hover:border-gold hover:text-gold"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll(340)}
                aria-label="Scroll right"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-background text-muted transition-colors hover:border-gold hover:text-gold"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((p) => (
            <div key={p.id} className="w-[46%] shrink-0 sm:w-[31%] lg:w-[23%]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
