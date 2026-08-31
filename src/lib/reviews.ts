import { api, ApiError } from "@/lib/api";

export type Review = {
  id: number;
  productId: string;
  customerName: string;
  rating: number;
  text: string;
  createdAt: string;
};

export type ReviewBreakdown = { stars: number; count: number };

export type ReviewsData = {
  reviews: Review[];
  breakdown: ReviewBreakdown[];
};

export async function fetchProductReviews(productId: string): Promise<ReviewsData> {
  return api.get<ReviewsData>(`/products/${encodeURIComponent(productId)}/reviews`);
}

export async function submitReview(
  productId: string,
  rating: number,
  text: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await api.post(`/customer/products/${encodeURIComponent(productId)}/reviews`, {
      rating,
      text,
    });
    return { ok: true };
  } catch (err) {
    const message = err instanceof ApiError ? err.message : "Could not submit your review";
    return { ok: false, error: message };
  }
}
