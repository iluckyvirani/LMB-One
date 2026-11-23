import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ShieldCheck, Heart, Award } from "lucide-react";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | Our Story & Heritage",
  description: `Discover the craftsmanship, heritage, and philosophy behind ${BRAND.storeName}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <nav className="mb-6 text-xs text-muted">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground/80">Our Story</span>
      </nav>

      {/* Hero Header */}
      <div className="border-b border-white/10 pb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium">Bespoke Heritage</p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-5xl">
          The Art of Fine Shoemaking
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg leading-relaxed">
          At {BRAND.storeName}, we believe that a fine pair of shoes is more than leather and stitches—it is an elevation of posture, confidence, and personal legacy.
        </p>
      </div>

      {/* Pillars */}
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        <div className="border border-white/10 bg-white/[0.02] p-6">
          <Award className="h-6 w-6 text-gold" />
          <h3 className="mt-4 font-heading text-lg text-white">Full-Grain Leathers</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            We partner with premier certified tanneries, hand-selecting calfskin and velvet with rich natural patinas that grow more distinguished with age.
          </p>
        </div>
        <div className="border border-white/10 bg-white/[0.02] p-6">
          <Sparkles className="h-6 w-6 text-gold" />
          <h3 className="mt-4 font-heading text-lg text-white">Artisanal Craftsmanship</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            Each silhouette passes through over 180 meticulous steps, from precision hand-clicking to Goodyear welt stitching and artisanal edge burnishing.
          </p>
        </div>
        <div className="border border-white/10 bg-white/[0.02] p-6">
          <Heart className="h-6 w-6 text-gold" />
          <h3 className="mt-4 font-heading text-lg text-white">All-Day Ergonomics</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            High-density memory-foam arch supports and breathable moisture-wicking linings ensure you command rooms from morning boards to black-tie galas.
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="mt-16 space-y-8 text-sm leading-relaxed text-muted">
        <section className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-heading text-2xl text-white">Handcrafted for Modern Connoisseurs</h2>
            <p className="mt-3">
              Founded on the belief that luxury should be felt in every stride, {BRAND.storeName} bridges classical European shoemaking heritage with contemporary silhouettes. From sharp pointed stilettos to commanding Chelsea boots and high-performance trainers, our collections honor individual style.
            </p>
            <p className="mt-3">
              Every curve, toe box dimension, and pitch angle is calibrated to provide optimal weight distribution, banishing the age-old compromise between aesthetics and comfort.
            </p>
          </div>
          <div className="rounded border border-white/10 bg-gradient-to-br from-gold/15 to-transparent p-8 text-center">
            <p className="font-heading text-4xl font-bold text-gold">50,000+</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-white">Satisfied Patrons Across India</p>
            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="font-heading text-2xl text-white">100%</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted">Artisanal Genuine Craftsmanship</p>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 pt-12 text-center">
          <h2 className="font-heading text-2xl text-white">Experience the Difference</h2>
          <p className="mt-2 mx-auto max-w-xl text-xs text-muted">
            Explore our curated catalog or consult with our master fitters to find the pair that speaks to your journey.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-gold px-8 py-3 text-sm font-medium text-background hover:bg-gold-accent transition-colors"
            >
              Explore Collection
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-gold/50 px-8 py-3 text-sm font-medium text-gold hover:bg-gold/10 transition-colors"
            >
              Contact Concierge
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
