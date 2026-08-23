import Link from "next/link";
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
  if (!products.length) return null;

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-3">
          <h2 className="font-heading text-2xl text-white md:text-3xl">{title}</h2>
          {href && (
            <Link
              href={href}
              className="text-sm text-gold transition-colors hover:text-gold-accent"
            >
              View all →
            </Link>
          )}
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
