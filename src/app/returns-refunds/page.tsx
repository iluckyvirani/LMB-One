import type { Metadata } from "next";
import Link from "next/link";
import { RotateCcw, CheckCircle, ShieldAlert, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Returns & Refund Policy",
  description: `7-Day Hassle-free Exchange and Return Policy for ${BRAND.storeName}.`,
};

export default function ReturnsRefundsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <nav className="mb-6 text-xs text-muted">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground/80">Returns &amp; Refunds</span>
      </nav>

      <div className="flex items-center gap-3">
        <RotateCcw className="h-8 w-8 text-gold" />
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Returns &amp; Exchanges
        </h1>
      </div>
      <p className="mt-2 text-sm text-muted">
        We want you to love your fit. If a pair doesn&apos;t feel right, we make exchanges and returns effortless.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="border border-white/10 bg-white/[0.02] p-5">
          <p className="font-heading text-lg text-gold">7-Day Window</p>
          <p className="mt-1 text-xs text-muted">
            Request an exchange or return within 7 days of delivery.
          </p>
        </div>
        <div className="border border-white/10 bg-white/[0.02] p-5">
          <p className="font-heading text-lg text-gold">Free Size Exchange</p>
          <p className="mt-1 text-xs text-muted">
            Need a half size up or down? We exchange sizes with zero pickup fee.
          </p>
        </div>
        <div className="border border-white/10 bg-white/[0.02] p-5">
          <p className="font-heading text-lg text-gold">Quick Refunds</p>
          <p className="mt-1 text-xs text-muted">
            Refunds initiated within 48 hours of quality inspection at our hub.
          </p>
        </div>
      </div>

      <div className="mt-12 space-y-8 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="font-heading text-xl text-foreground">1. Eligibility Criteria for Returns</h2>
          <p className="mt-2">To be eligible for an exchange or refund, the following conditions must be met:</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>The shoes must be <strong>unworn outdoors</strong> and tried on only on clean, carpeted indoor surfaces.</li>
            <li>Outsoles and leather uppers must have zero scuffs, scratches, or dirt marks.</li>
            <li>All original packaging—including shoe boxes, dust bags, tags, and authenticity cards—must be returned intact.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl text-foreground">2. Step-by-Step Return Process</h2>
          <ol className="mt-2 list-decimal space-y-2 pl-5">
            <li>Visit your <Link href="/orders" className="text-gold underline">My Orders</Link> dashboard or email us at <strong>returns@lmbshoes.com</strong> with your Order ID and photo of the unworn soles.</li>
            <li>Once approved, our courier partner will arrive at your address to inspect and pick up the package.</li>
            <li>Upon arrival at our warehouse, your exchange pair will be dispatched immediately, or your refund initiated.</li>
          </ol>
        </section>

        <section>
          <h2 className="font-heading text-xl text-foreground">3. Refund Timelines</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li><strong>Prepaid Orders (UPI / Cards):</strong> Refund is credited back to your original source within 3–5 working days after inspection.</li>
            <li><strong>Cash on Delivery (COD):</strong> Refund is sent directly to your verified UPI ID or Bank Account via NEFT within 24–48 hours of receiving bank details.</li>
          </ul>
        </section>

        <div className="border border-gold/30 bg-gold/5 p-6 text-xs text-gold">
          <p className="font-semibold text-sm">Need help with sizing before ordering?</p>
          <p className="mt-1">
            Check our comprehensive <Link href="/size-guide" className="underline font-medium">Footwear Size Guide</Link> or WhatsApp our master fit stylists at +91 98765 43210.
          </p>
        </div>
      </div>
    </div>
  );
}

