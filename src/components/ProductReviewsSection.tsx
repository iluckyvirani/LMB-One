import { Star } from "lucide-react";
import type { Product } from "@/lib/types";
import type { ReviewsData } from "@/lib/reviews";
import { WriteReviewForm } from "@/components/WriteReviewForm";

export function ProductReviewsSection({
  product,
  reviewsData,
}: {
  product: Product;
  reviewsData: ReviewsData;
}) {
  const { reviews, breakdown } = reviewsData;
  const maxCount = Math.max(...breakdown.map((b) => b.count), 1);

  return (
    <section className="border-t border-white/10 pt-10">
      <h2 className="mb-6 font-heading text-2xl text-foreground">Ratings & Reviews</h2>

      <div className="grid gap-8 sm:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center justify-center gap-1 border border-white/10 bg-white/[0.03] px-8 py-6 text-center sm:items-start sm:text-left">
          <p className="flex items-baseline gap-1 font-[family-name:var(--font-poppins)] text-4xl text-foreground">
            {product.rating}
            <Star className="h-5 w-5 text-gold" fill="var(--gold)" />
          </p>
          <p className="text-sm text-muted">{product.reviewsCount} Verified Buyers</p>
        </div>

        <div className="space-y-1.5">
          {breakdown.map((b) => (
            <div key={b.stars} className="flex items-center gap-3 text-sm">
              <span className="w-3 text-muted">{b.stars}</span>
              <div className="h-1.5 flex-1 bg-white/10">
                <div
                  className="h-full bg-gold"
                  style={{ width: `${(b.count / maxCount) * 100}%` }}
                />
              </div>
              <span className="w-8 text-right text-muted">{b.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <WriteReviewForm productId={product.id} />
      </div>

      {reviews.length === 0 ? (
        <p className="mt-8 text-sm text-muted">
          No reviews yet — be the first to review this product.
        </p>
      ) : (
        <ul className="mt-8 space-y-6">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="border-t border-white/10 pt-6 first:border-t-0 first:pt-0"
            >
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 bg-gold/10 px-2 py-0.5 text-xs font-medium text-gold">
                  {review.rating}
                  <Star className="h-3 w-3" fill="var(--gold)" />
                </span>
                <span className="text-sm text-foreground">{review.customerName}</span>
                <span className="text-xs text-muted">· Verified Purchase</span>
              </div>
              <p className="mt-2 text-sm text-muted">{review.text}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
