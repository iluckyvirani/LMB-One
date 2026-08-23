import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-20 sm:px-6">
      <h1 className="mb-6 font-heading text-3xl text-foreground">
        Contact {BRAND.storeName}
      </h1>
      <p className="mb-8 text-muted">
        Questions about an order or a pair of shoes? Reach out below.
      </p>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your name"
          className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-gold/40 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Your email"
          className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-gold/40 focus:outline-none"
        />
        <textarea
          placeholder="Your message"
          rows={5}
          className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-gold/40 focus:outline-none"
        />
        <button
          type="button"
          className="rounded-full bg-gold px-8 py-3 font-medium text-background transition-colors hover:bg-gold-accent"
        >
          Send Message
        </button>
        <p className="text-xs text-muted">
          This form is a UI mock — no message is sent yet.
        </p>
      </form>
    </div>
  );
}
