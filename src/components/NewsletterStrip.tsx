"use client";

import { useState } from "react";
import { useSettingsStore } from "@/store/settings";

export function NewsletterStrip() {
  const settings = useSettingsStore((s) => s.settings);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="border-t border-white/10 bg-background-secondary/40 px-6 py-14 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Stay in the loop</p>
      <h2 className="mt-2 font-heading text-2xl text-foreground sm:text-3xl">
        {settings.newsletterHeading}
      </h2>
      <p className="mt-2 text-sm text-muted">{settings.newsletterSubtext}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!email.trim()) return;
          setSubmitted(true);
        }}
        className="mx-auto mt-6 flex max-w-md gap-2"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full border border-white/15 bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-gold"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-gold px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-gold-accent"
        >
          {submitted ? "Subscribed ✓" : "Subscribe"}
        </button>
      </form>
      <p className="mt-3 text-xs text-muted">
        This is a mock signup — no email is sent.
      </p>
    </section>
  );
}
