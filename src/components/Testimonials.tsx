import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Ananya R.",
    location: "Delhi",
    rating: 5,
    text: "The Aurora Heel is the most comfortable pair I've worn to a wedding. True to size and the packaging felt genuinely premium.",
  },
  {
    name: "Karan M.",
    location: "Bengaluru",
    rating: 5,
    text: "Ordered the Regal Oxford for work — the leather quality is way above what I expected at this price. Delivery was quick too.",
  },
  {
    name: "Priya S.",
    location: "Mumbai",
    rating: 4,
    text: "CloudStep Runners are now my daily gym pair. Great cushioning, and the customer support was helpful when I had a sizing question.",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Trusted by 50,000+</p>
        <h2 className="mt-2 font-heading text-2xl text-foreground sm:text-3xl">
          What our customers say
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {REVIEWS.map((r) => (
          <div
            key={r.name}
            className="border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4"
                  fill={i < r.rating ? "var(--gold)" : "none"}
                  stroke="var(--gold)"
                />
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">&ldquo;{r.text}&rdquo;</p>
            <p className="mt-4 text-sm text-foreground">
              {r.name} <span className="text-muted">· {r.location}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
