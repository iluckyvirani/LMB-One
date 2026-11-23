"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Truck, ArrowRight, CheckCircle2 } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { OrderTrack } from "@/components/OrdersView";
import { formatINR } from "@/lib/format";

export default function TrackOrderPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [foundOrder, setFoundOrder] = useState<any | null>(null);

  async function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    const cleanId = orderId.trim().toUpperCase();
    const cleanPhone = phone.trim().replace(/\D/g, "");

    if (!cleanId) {
      setError("Please enter your Order ID");
      return;
    }

    setLoading(true);
    setError("");
    setFoundOrder(null);

    try {
      const url = cleanPhone
        ? `/orders/track?id=${encodeURIComponent(cleanId)}&phone=${encodeURIComponent(cleanPhone)}`
        : `/orders/track?id=${encodeURIComponent(cleanId)}`;
      const data = await api.get<any>(url);
      setFoundOrder(data);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Could not find an order with this ID and phone number. Please check and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-3 sm:px-6 py-6 sm:py-16">
      <nav className="mb-6 text-xs text-muted">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground/80">Track Order</span>
      </nav>

      <div className="flex items-center gap-3">
        <Truck className="h-8 w-8 text-gold" />
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Track Your Shipment
        </h1>
      </div>
      <p className="mt-2 text-sm text-muted">
        Enter your Order ID and contact number below to get live delivery updates, courier tracking, and dispatch details.
      </p>

      {!foundOrder ? (
        <div className="mt-10 border border-white/10 bg-white/[0.02] p-6 sm:p-8 max-w-xl">
          <form onSubmit={handleTrack} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted mb-1.5 font-medium">
                Order ID *
              </label>
              <input
                type="text"
                required
                value={orderId}
                onChange={(e) => {
                  setOrderId(e.target.value.toUpperCase());
                  if (error) setError("");
                }}
                placeholder="e.g. LMB-1234567"
                className="w-full border border-white/15 bg-background px-4 py-3 text-sm font-mono text-foreground outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted mb-1.5 font-medium">
                Phone Number (Used during checkout)
              </label>
              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                  if (error) setError("");
                }}
                placeholder="10-digit mobile number"
                className="w-full border border-white/15 bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-gold"
              />
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading || !orderId.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-background transition-colors hover:bg-gold-accent disabled:opacity-40"
            >
              {loading ? "Searching courier records…" : "Track Order Status"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 border-t border-white/10 pt-4 text-xs text-muted">
            <p>
              Signed in with your phone? You can also view all past purchases directly in{" "}
              <Link href="/orders" className="text-gold underline">My Orders</Link>.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          <button
            type="button"
            onClick={() => setFoundOrder(null)}
            className="text-xs text-gold hover:underline"
          >
            &larr; Track another order
          </button>
          <OrderTrack orderId={foundOrder.id} />
        </div>
      )}
    </div>
  );
}

