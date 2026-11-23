import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and Conditions for purchasing from ${BRAND.storeName}.`,
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <nav className="mb-6 text-xs text-muted">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground/80">Terms &amp; Conditions</span>
      </nav>

      <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
        Terms &amp; Conditions
      </h1>
      <p className="mt-2 text-xs text-muted">Effective Date: October 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="font-heading text-xl text-foreground">1. Overview</h2>
          <p className="mt-2">
            These Terms &amp; Conditions govern your access to and use of {BRAND.storeName}. By accessing our website, purchasing products, or using our services, you agree to be bound by these Terms and our associated policies.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-foreground">2. Product Authenticity &amp; Handcrafting</h2>
          <p className="mt-2">
            Every footwear item featured on {BRAND.storeName} is 100% genuine and handcrafted using premium materials. Because our genuine leather finishes are hand-burnished and crafted by artisans, subtle natural grain variations and tonal nuances are characteristics of authentic craftsmanship, not defects.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-foreground">3. Pricing &amp; Taxes</h2>
          <p className="mt-2">
            All prices are quoted in Indian Rupees (INR) and are inclusive of Goods and Services Tax (GST) as applicable under Indian Law. We reserve the right to modify prices, discontinue products, or update promotional offerings without prior notice.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-foreground">4. Order Acceptance &amp; Cancellation</h2>
          <p className="mt-2">
            Receipt of an order confirmation does not signify our final acceptance of your order. We reserve the right to cancel any order in instances of pricing errors, unauthorized coupon usage, or inventory stock discrepancies. If your order is cancelled by us after payment, a full refund will be processed to the original payment source within 3–5 working days.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-foreground">5. Governing Law &amp; Jurisdiction</h2>
          <p className="mt-2">
            These Terms shall be construed in accordance with the laws of India. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of India.
          </p>
        </section>
      </div>
    </div>
  );
}

