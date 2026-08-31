import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star } from "lucide-react";
import {
  CATEGORIES,
  STYLES,
  fetchAllProducts,
  fetchProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { fetchProductReviews } from "@/lib/reviews";
import { fetchBankOffers } from "@/lib/content";
import { discountPercent, formatINR } from "@/lib/format";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { AddToCartButton } from "@/components/AddToCartButton";
import { DeliveryCheck } from "@/components/DeliveryCheck";
import { BankOffers } from "@/components/BankOffers";
import { ProductSpecs } from "@/components/ProductSpecs";
import { ProductReviewsSection } from "@/components/ProductReviewsSection";
import { RecordView } from "@/components/RecordView";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  return { title: product?.title ?? "Product" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) notFound();

  const allProducts = await fetchAllProducts();
  const related = getRelatedProducts(allProducts, product);
  const reviewsData = await fetchProductReviews(product.id);
  const bankOffers = await fetchBankOffers();
  const off = discountPercent(product.price, product.mrp);
  const categoryLabel = CATEGORIES.find((c) => c.value === product.category)?.label;
  const styleLabel = STYLES.find((s) => s.value === product.style)?.label;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <RecordView product={product} />

      <nav className="mb-6 flex flex-wrap items-center gap-x-2 text-xs text-muted">
        <Link href="/" className="hover:text-gold">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-gold">
          Shop
        </Link>
        {categoryLabel && (
          <>
            <span>/</span>
            <Link href={`/shop?category=${product.category}`} className="hover:text-gold">
              {categoryLabel}
            </Link>
          </>
        )}
        {styleLabel && (
          <>
            <span>/</span>
            <span className="text-foreground/80">{styleLabel}</span>
          </>
        )}
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery product={product} />

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-gold/80">
              {product.collection}
            </p>
            <h1 className="mt-1 font-heading text-3xl text-foreground">
              {product.title}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {product.colorway}
            </p>
            <span className="mt-2 inline-flex items-center gap-1 bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-400">
              {product.rating}
              <Star className="h-3 w-3" fill="currentColor" />
              <span className="font-normal text-emerald-400/80">
                | {product.reviewsCount} Ratings
              </span>
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-3 font-[family-name:var(--font-poppins)] text-2xl">
              <span className="text-gold">{formatINR(product.price)}</span>
              {off > 0 && (
                <>
                  <span className="text-base text-muted line-through">
                    MRP {formatINR(product.mrp)}
                  </span>
                  <span className="text-sm text-gold">({off}% OFF)</span>
                </>
              )}
            </div>
            <p className="mt-1 text-xs text-muted">inclusive of all taxes</p>
          </div>

          <AddToCartButton product={product} />

          <div className="border-t border-white/10 pt-6">
            <DeliveryCheck />
          </div>

          <div className="border-t border-white/10 pt-6">
            <BankOffers offers={bankOffers} />
          </div>
        </div>
      </div>

      <ProductSpecs product={product} />

      <ProductReviewsSection product={product} reviewsData={reviewsData} />

      {related.length > 0 && (
        <section className="mt-16 border-t border-white/10 pt-10">
          <h2 className="mb-6 font-heading text-2xl text-foreground">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-12">
        <Link href="/shop" className="text-sm text-gold hover:underline">
          ← Back to Shop
        </Link>
      </div>
    </div>
  );
}
