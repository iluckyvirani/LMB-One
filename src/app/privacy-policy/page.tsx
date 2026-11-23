import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${BRAND.storeName} - How we handle, protect, and process your data.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <nav className="mb-6 text-xs text-muted">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground/80">Privacy Policy</span>
      </nav>

      <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-xs text-muted">Last updated: October 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="font-heading text-xl text-foreground">1. Introduction</h2>
          <p className="mt-2">
            Welcome to {BRAND.storeName} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We respect your privacy and are committed to safeguarding the personal data you share with us. This Privacy Policy details our practices regarding the collection, use, and disclosure of your personal information when you visit and purchase from our store.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-foreground">2. Information We Collect</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li><strong>Personal Contact Information:</strong> Your name, phone number, and email address collected during account creation, OTP login, or checkout.</li>
            <li><strong>Delivery Information:</strong> Physical shipping address, pincode, state, and city necessary for courier fulfilment.</li>
            <li><strong>Order History &amp; Preferences:</strong> Records of products viewed, wishlisted, and purchased.</li>
            <li><strong>Technical Data:</strong> Browser type, IP address, device specifications, and cookie data to optimize storefront performance and security.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl text-foreground">3. How We Use Your Information</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>To process, dispatch, and track your orders.</li>
            <li>To verify mobile OTPs for passwordless, secure authentication.</li>
            <li>To communicate real-time updates regarding order status, shipments, and customer service inquiries.</li>
            <li>To prevent fraudulent transactions and unauthorized access.</li>
            <li>With your consent, to deliver drops, restock alerts, and VIP promotions via email and WhatsApp.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl text-foreground">4. Payment &amp; Financial Data</h2>
          <p className="mt-2">
            We do not store or have direct access to your credit card, debit card, or UPI banking credentials. All payments are encrypted and processed through PCI-DSS compliant payment gateways and certified banking partners.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-foreground">5. Data Sharing &amp; Third Parties</h2>
          <p className="mt-2">
            We only share essential shipping data with verified logistics partners (such as Delhivery, Blue Dart, Xpressbees) to ensure timely delivery of your shoes. We will never sell, lease, or rent your personal information to third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-foreground">6. Contact Our Grievance Officer</h2>
          <p className="mt-2">
            For any privacy inquiries, data deletion requests, or questions regarding this policy, please reach out to:
          </p>
          <div className="mt-3 border border-white/10 bg-white/[0.02] p-4 text-xs">
            <p className="font-medium text-foreground">{BRAND.storeName} Privacy Team</p>
            <p className="mt-1">Email: privacy@lmbshoes.com</p>
            <p>Support Phone: +91 98765 43210</p>
          </div>
        </section>
      </div>
    </div>
  );
}

