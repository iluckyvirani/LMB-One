"use client";

import { useState } from "react";
import { api, ApiError } from "@/lib/api";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await api.post("/contact", {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Could not send your message. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <p className="border border-gold/40 bg-gold/5 px-4 py-3 text-sm text-gold">
        Thanks for reaching out — we&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-gold/40 focus:outline-none"
      />
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-gold/40 focus:outline-none"
      />
      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your message"
        rows={5}
        className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-gold/40 focus:outline-none"
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-gold px-8 py-3 font-medium text-background transition-colors hover:bg-gold-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
