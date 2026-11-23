"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/constants";

const FAQS = [
  {
    q: "How do I choose the correct shoe size?",
    a: "All LMB Shoes adhere to standard Indian and UK sizing. Please check our interactive Size Guide for millimeter conversions. If you have wide feet or fall between sizes, we recommend sizing up by one size.",
  },
  {
    q: "Are LMB shoes made from genuine leather?",
    a: "Yes. Our Heritage and Édition collections are handcrafted with 100% full-grain calfskin and top-grain leather sourced from certified tanneries. Our Sport collection utilizes breathable engineered flyknit mesh and anti-abrasion TPU plates.",
  },
  {
    q: "How does Cash on Delivery (COD) work?",
    a: "We offer Cash on Delivery across serviceable pincodes in India for orders up to ₹10,000. You can pay cash or scan the courier's dynamic UPI QR code right at your doorstep upon package arrival.",
  },
  {
    q: "What is your exchange and return policy?",
    a: "We provide a 7-day hassle-free size exchange and return window for any pairs tried indoors and returned in pristine original condition with original boxes and tags.",
  },
  {
    q: "How long will my order take to arrive?",
    a: "Orders in metro cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata) arrive within 3–4 business days. Regional and tier-2/3 cities are delivered within 5–7 business days.",
  },
  {
    q: "How can I track my order if I checked out without an account?",
    a: "You can track any order anytime by visiting our Guest Order Tracker page. Simply enter your Order ID (e.g. LMB-1234567) and the phone number used at checkout to see live shipment and courier milestones.",
  },
  {
    q: "Do you offer warranty on your shoes?",
    a: "Every pair of LMB Shoes comes with our 60-Day Brand Craftsmanship Warranty covering sole bonding, stitching integrity, and hardware.",
  },
];

export default function FaqsPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <nav className="mb-6 text-xs text-muted">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground/80">FAQs</span>
      </nav>

      <div className="flex items-center gap-3">
        <HelpCircle className="h-8 w-8 text-gold" />
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Frequently Asked Questions
        </h1>
      </div>
      <p className="mt-2 text-sm text-muted">
        Find answers regarding sizing, leather care, shipping times, and our warranty guarantee.
      </p>

      <div className="mt-10 space-y-3">
        {FAQS.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className="border border-white/10 bg-white/[0.02] transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left text-sm font-medium text-foreground hover:text-gold"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-gold transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              {isOpen && (
                <div className="border-t border-white/10 px-5 pb-5 pt-3 text-sm leading-relaxed text-muted">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded border border-gold/30 bg-gold/5 p-6 text-center">
        <h3 className="font-heading text-lg text-foreground">Still have questions?</h3>
        <p className="mt-1 text-xs text-muted">
          Our footwear concierges are available 7 days a week, 10 AM to 8 PM IST.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
          <Link
            href="/contact"
            className="rounded-full bg-gold px-6 py-2.5 font-medium text-background hover:bg-gold-accent"
          >
            Contact Support
          </Link>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gold/50 px-6 py-2.5 font-medium text-gold hover:bg-gold/10"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}

