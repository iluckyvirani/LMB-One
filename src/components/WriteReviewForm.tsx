"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useHasHydrated } from "@/lib/useHasHydrated";
import { submitReview } from "@/lib/reviews";
import { cn } from "@/lib/utils";
import { LoginModal } from "@/components/LoginModal";

export function WriteReviewForm({ productId }: { productId: string }) {
  const router = useRouter();
  const hydrated = useHasHydrated();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const [loginOpen, setLoginOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!hydrated) return null;

  if (!isLoggedIn) {
    return (
      <div className="border border-white/10 bg-white/[0.02] p-5 text-sm text-muted">
        <button
          type="button"
          onClick={() => setLoginOpen(true)}
          className="text-gold hover:underline"
        >
          Login
        </button>{" "}
        to write a review — only customers who&apos;ve purchased this product can review it.
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="border border-gold/40 bg-gold/5 p-5 text-sm text-gold">
        Thanks — your review has been posted.
      </div>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating || !text.trim() || submitting) return;
    setSubmitting(true);
    setError("");
    const result = await submitReview(productId, rating, text.trim());
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSubmitted(true);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-3 border border-white/10 bg-white/[0.02] p-5">
      <p className="text-sm font-medium text-foreground">Write a review</p>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setRating(s)}
            onMouseEnter={() => setHoverRating(s)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`${s} star`}
            className="p-0.5"
          >
            <Star
              className={cn(
                "h-5 w-5 transition-colors",
                s <= (hoverRating || rating) ? "text-gold" : "text-white/20",
              )}
              fill={s <= (hoverRating || rating) ? "var(--gold)" : "none"}
            />
          </button>
        ))}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Share your experience with this product…"
        className="w-full border border-white/15 bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted focus:border-gold"
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={!rating || !text.trim() || submitting}
        className="rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-gold-accent disabled:cursor-not-allowed disabled:opacity-40"
      >
        {submitting ? "Posting…" : "Post Review"}
      </button>
    </form>
  );
}
