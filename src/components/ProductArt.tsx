import { Footprints } from "lucide-react";
import type { Product } from "@/lib/types";
import { clsx } from "clsx";

export function ProductArt({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <div
      className={clsx("flex items-center justify-center", className)}
      style={{
        background: `linear-gradient(135deg, ${product.swatch[0]}, ${product.swatch[1]})`,
      }}
    >
      <Footprints className="h-1/4 w-1/4 text-white/70" strokeWidth={1.25} />
    </div>
  );
}
