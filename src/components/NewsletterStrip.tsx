"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useSettingsStore } from "@/store/settings";
import { api, ApiError } from "@/lib/api";

export function NewsletterStrip() {
  const settings = useSettingsStore((s) => s.settings);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    setSubmitting(true);
    setError("");

    try {
      await api.post("/newsletter", { email: cleanEmail });
      setSubmitted(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to subscribe. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="border-t border-white/10 bg-background-secondary/40 px-6 py-14 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Stay in the loop</p>
      <h2 className="mt-2 font-heading text-2xl text-foreground sm:text-3xl">
        {settings.newsletterHeading || "Get 10% off your first order"}
      </h2>
      <p className="mt-2 text-sm text-muted">
        {settings.newsletterSubtext || "Sign up for drops, restocks and members-only offers."}
      </p>

      {submitted ? (
        <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 rounded border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>You&apos;re on the VIP list! Check your inbox for exclusive perks.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            placeholder="Enter your email address"
            className="w-full border border-white/15 bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-gold"
          />
          <button
            type="submit"
            disabled={submitting}
            className="shrink-0 rounded-full bg-gold px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-gold-accent disabled:opacity-50"
          >
            {submitting ? "Joining…" : "Subscribe"}
          </button>
        </form>
      )}

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      <p className="mt-3 text-xs text-muted/70">
        By subscribing, you agree to our Terms &amp; Privacy Policy. Unsubscribe anytime.
      </p>
    </section>
  );
}
