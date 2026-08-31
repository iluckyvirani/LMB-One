import Link from "next/link";
import {
  CATEGORIES,
  fetchAllProducts,
  getOffers,
  getProductsByCategory,
  getProductsByTag,
} from "@/lib/products";
import { fetchBanners } from "@/lib/content";
import { BannerCarousel } from "@/components/BannerCarousel";
import { ProductRail } from "@/components/ProductRail";
import { TrustStrip } from "@/components/TrustStrip";
import { PriceBuckets } from "@/components/PriceBuckets";
import { RecentlyViewedRail } from "@/components/RecentlyViewedRail";
import { Testimonials } from "@/components/Testimonials";
import { ProductArt } from "@/components/ProductArt";
import { NewsletterStrip } from "@/components/NewsletterStrip";

export default async function Home() {
  const products = await fetchAllProducts();
  const banners = await fetchBanners();
  const men = getProductsByCategory(products, "men").slice(0, 4);
  const women = getProductsByCategory(products, "women").slice(0, 4);
  const kids = getProductsByCategory(products, "kids").slice(0, 4);
  const sports = getProductsByCategory(products, "sports").slice(0, 4);
  const newArrivals = getProductsByTag(products, "new-arrival", 4);
  const bestSellers = getProductsByTag(products, "bestseller", 4);
  const partyWear = getProductsByTag(products, "party-wear", 4);
  const dailyWear = getProductsByTag(products, "daily-wear", 4);
  const offers = getOffers(products, 20, 4);

  return (
    <div className="flex flex-col">
      <BannerCarousel banners={banners} />

      <TrustStrip />

      <section className="mx-auto w-full max-w-7xl px-4 py-12 lg:px-8">
        <h2 className="mb-6 font-heading text-2xl text-foreground">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={`/shop?category=${cat.value}`}
              className="border border-white/10 bg-white/[0.03] px-4 py-6 text-center transition-colors hover:border-gold/40"
            >
              <span className="font-heading text-lg text-foreground">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <ProductRail title="Men" href="/shop?category=men" products={men} />
      <div className="border-y border-white/10 bg-background-secondary/25">
        <ProductRail title="Women" href="/shop?category=women" products={women} />
      </div>
      <ProductRail title="Kids" href="/shop?category=kids" products={kids} />
      <div className="border-y border-white/10 bg-background-secondary/25">
        <ProductRail
          title="Sports"
          href="/shop?category=sports"
          products={sports}
        />
      </div>

      <div className="border-b border-white/10">
        <ProductRail
          title="New Arrivals"
          href="/shop?tag=new-arrival"
          products={newArrivals}
        />
      </div>

      <PriceBuckets />

      <ProductRail
        title="Best Sellers"
        href="/shop?tag=bestseller"
        products={bestSellers}
      />

      <div className="border-y border-white/10 bg-background-secondary/25">
        <ProductRail
          title="Party Wear"
          href="/shop?tag=party-wear"
          products={partyWear}
        />
      </div>

      <ProductRail
        title="Daily Wear"
        href="/shop?tag=daily-wear"
        products={dailyWear}
      />

      <section className="border-y border-white/10 bg-gold/[0.06]">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">
                Limited Time
              </p>
              <h2 className="mt-1 font-heading text-2xl text-white md:text-3xl">
                Offers — up to 25% off
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-sm text-gold transition-colors hover:text-gold-accent"
            >
              View all →
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {offers.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="group block h-full w-[46%] shrink-0 overflow-hidden border border-gold/20 bg-white/[0.03] transition-all hover:border-gold/60 hover:shadow-lg sm:w-[31%] lg:w-[23%]"
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-background-secondary">
                  <ProductArt product={p} className="h-full w-full" />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-lg text-white transition-colors group-hover:text-gold">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-gold">
                    {Math.round(((p.mrp - p.price) / p.mrp) * 100)}% off
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RecentlyViewedRail />

      <Testimonials />

      <section className="border-t border-white/10 bg-background-secondary/25 px-6 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          Free Shipping
        </p>
        <h2 className="mt-2 font-heading text-2xl text-foreground sm:text-3xl">
          Every order ships free, no minimum
        </h2>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-gold px-8 py-3 font-medium text-background transition-colors hover:bg-gold-accent"
        >
          Shop Now
        </Link>
      </section>

      <NewsletterStrip />
    </div>
  );
}
