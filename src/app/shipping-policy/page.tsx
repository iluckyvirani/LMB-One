import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Clock, ShieldCheck, MapPin } from "lucide-react";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description: `Shipping details, delivery timelines, and courier partners for ${BRAND.storeName}.`,
};

export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <nav className="mb-6 text-xs text-muted">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground/80">Shipping Policy</span>
      </nav>

      <div className="flex items-center gap-3">
        <Truck className="h-8 w-8 text-gold" />
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Shipping &amp; Delivery
        </h1>
      </div>
      <p className="mt-2 text-sm text-muted">
        Prompt, secure, and insured courier delivery across 25,000+ pincodes across India.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="border border-white/10 bg-white/[0.02] p-5">
          <Clock className="h-5 w-5 text-gold" />
          <p className="mt-2 font-heading text-lg text-white">3–7 Days Delivery</p>
          <p className="mt-1 text-xs text-muted">Metro cities in 3-4 days; rest of India in 5-7 days.</p>
        </div>
        <div className="border border-white/10 bg-white/[0.02] p-5">
          <ShieldCheck className="h-5 w-5 text-gold" />
          <p className="mt-2 font-heading text-lg text-white">Insured Shipments</p>
          <p className="mt-1 text-xs text-muted">Every pair is transit-insured in tamper-evident luxury boxes.</p>
        </div>
        <div className="border border-white/10 bg-white/[0.02] p-5">
          <MapPin className="h-5 w-5 text-gold" />
          <p className="mt-2 font-heading text-lg text-white">Live AWB Tracking</p>
          <p className="mt-1 text-xs text-muted">Real-time SMS and web tracking with courier partners.</p>
        </div>
      </div>

      <div className="mt-12 space-y-8 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="font-heading text-xl text-foreground">1. Shipping Fees &amp; Thresholds</h2>
          <p className="mt-2">
            We offer <strong>Free Standard Shipping</strong> on qualifying orders. Standard flat shipping fee of ₹99 applies on smaller carts below the threshold. Your exact shipping fee is transparently calculated during checkout before payment.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-foreground">2. Courier Partners</h2>
          <p className="mt-2">
            To guarantee safety and speed, we partner exclusively with top-tier logistics providers including <strong>Delhivery, Blue Dart, Xpressbees, and Ecom Express</strong>.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-foreground">3. Cash on Delivery (COD)</h2>
          <p className="mt-2">
            Cash on Delivery is available for serviceable pincodes up to an order value of ₹10,000. Our delivery associate will collect the exact amount in cash or via UPI QR scan at your doorstep upon package arrival.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-foreground">4. Tracking Your Package</h2>
          <p className="mt-2">
            Once dispatched, you will receive an AWB tracking code. You can monitor your shipment anytime using our <Link href="/track-order" className="text-gold underline">Guest Order Tracker</Link> or in the <Link href="/orders" className="text-gold underline">My Orders</Link> section.
          </p>
        </section>
      </div>
    </div>
  );
}

