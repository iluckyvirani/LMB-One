import Link from "next/link";
import { Phone, Mail, ShieldCheck, RotateCcw, Truck, CreditCard } from "lucide-react";
import { BRAND, FOOTER_COLUMNS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background-secondary">
      {/* Trust Highlights Bar */}
      <div className="border-b border-white/10 bg-white/[0.01]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-medium text-foreground">100% Handcrafted</p>
              <p className="text-[11px] text-muted">Genuine leather guaranteed</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
              <RotateCcw className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-medium text-foreground">7 Days Free Exchange</p>
              <p className="text-[11px] text-muted">Zero-cost door pickup</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
              <Truck className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-medium text-foreground">All-India Delivery</p>
              <p className="text-[11px] text-muted">25,000+ serviceable pins</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
              <CreditCard className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-medium text-foreground">Secure Payments</p>
              <p className="text-[11px] text-muted">UPI, Cards, and COD</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <span className="font-heading text-xl font-bold tracking-tight text-foreground">
            {BRAND.storeName}
          </span>
          <p className="max-w-sm text-xs leading-relaxed text-muted">
            {BRAND.description}
          </p>

          <div className="space-y-2 pt-2 text-xs text-muted">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-gold" />
              <a href="tel:+919876543210" className="hover:text-gold transition-colors">
                +91 98765 43210 (10 AM - 8 PM IST)
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-gold" />
              <a href="mailto:support@lmbshoes.com" className="hover:text-gold transition-colors">
                support@lmbshoes.com
              </a>
            </div>
          </div>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title} className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-gold font-medium">
              {col.title}
            </p>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Payment Badges & Copyright */}
      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs text-muted sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {BRAND.storeName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted">
            <span className="border border-white/15 px-2 py-0.5 rounded">UPI</span>
            <span className="border border-white/15 px-2 py-0.5 rounded">Google Pay</span>
            <span className="border border-white/15 px-2 py-0.5 rounded">PhonePe</span>
            <span className="border border-white/15 px-2 py-0.5 rounded">RuPay</span>
            <span className="border border-white/15 px-2 py-0.5 rounded">Visa</span>
            <span className="border border-white/15 px-2 py-0.5 rounded">MasterCard</span>
            <span className="border border-white/15 px-2 py-0.5 rounded">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
