import type { Product } from "@/lib/types";
import { getProductSpecs } from "@/lib/productDetails";

export function ProductSpecs({ product }: { product: Product }) {
  const specs = getProductSpecs(product);

  return (
    <section className="border-t border-white/10 pt-10">
      <h2 className="mb-6 font-heading text-2xl text-foreground">Product Details</h2>
      <p className="mb-6 text-muted">{product.description}</p>
      <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {specs.map((spec) => (
          <div key={spec.label} className="flex justify-between border-b border-white/10 pb-2">
            <dt className="text-sm text-muted">{spec.label}</dt>
            <dd className="text-sm text-foreground">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
