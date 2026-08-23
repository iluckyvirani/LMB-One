import Link from "next/link";
import { PRICE_BUCKETS } from "@/lib/products";

export function PriceBuckets() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-8">
      <h2 className="mb-6 font-heading text-2xl text-foreground">Shop by Price</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {PRICE_BUCKETS.map((bucket) => (
          <Link
            key={bucket.label}
            href={`/shop?minPrice=${bucket.min}&maxPrice=${bucket.max}`}
            className="border border-white/10 bg-white/[0.03] px-4 py-6 text-center transition-colors hover:border-gold/40"
          >
            <span className="font-heading text-base text-foreground sm:text-lg">
              {bucket.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
