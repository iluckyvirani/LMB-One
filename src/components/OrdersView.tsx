"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, Truck, AlertTriangle, CheckCircle2, XCircle, ArrowLeft, RotateCcw } from "lucide-react";
import { formatINR } from "@/lib/format";
import { useOrderStore, getOrderTimeline, getOrderStatusLabel, type Order } from "@/store/orders";
import { useAuthStore } from "@/store/auth";
import { useHasHydrated } from "@/lib/useHasHydrated";
import { LoginModal } from "@/components/LoginModal";
import { AccountShell } from "@/components/account/AccountShell";
import { cn } from "@/lib/utils";

function LoginGate() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <h1 className="font-heading text-2xl text-foreground">
        Login to view your orders
      </h1>
      <p className="text-sm text-muted">
        Or use our public <Link href="/track-order" className="text-gold underline">Guest Order Tracker</Link> if you checked out as a guest.
      </p>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full bg-gold px-8 py-3 font-medium text-background transition-colors hover:bg-gold-accent"
      >
        Login
      </button>
      <LoginModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

function formatDay(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function OrderListCard({ order }: { order: Order }) {
  const first = order.items[0];
  const moreCount = order.items.reduce((n, i) => n + i.qty, 0) - (first?.qty ?? 0);
  const isCancelled = order.status === "cancelled";

  return (
    <Link
      href={`/orders/${order.id}`}
      className="flex flex-col gap-4 border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-gold/40 sm:flex-row sm:items-center"
    >
      <span className="relative h-20 w-20 shrink-0 overflow-hidden border border-white/10 bg-background-secondary">
        {first && (
          first.image ? (
            <img
              src={first.image}
              alt={first.title}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div
              className="h-full w-full"
              style={{
                background: `linear-gradient(135deg, ${first.swatch?.[0] || '#1a1a1a'}, ${first.swatch?.[1] || '#3a3a3a'})`,
              }}
            />
          )
        )}
        {moreCount > 0 && (
          <span className="absolute inset-x-0 bottom-0 bg-background/80 py-0.5 text-center text-[10px] text-gold">
            +{moreCount} more
          </span>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-heading text-lg text-white">
          {first?.title ?? order.id}
        </span>
        <span className="mt-1 block text-sm text-muted">
          {order.id} · {formatDay(order.createdAt)}
        </span>
        <span
          className={cn(
            "mt-2 inline-block border px-2 py-0.5 text-[10px] tracking-wide uppercase",
            isCancelled
              ? "border-red-400/40 bg-red-400/10 text-red-300"
              : "border-gold/40 bg-gold/10 text-gold",
          )}
        >
          {getOrderStatusLabel(order)}
        </span>
      </span>
      <span className="font-[family-name:var(--font-poppins)] text-gold sm:text-right">
        {formatINR(order.total)}
      </span>
      <ChevronRight className="hidden h-5 w-5 shrink-0 text-muted sm:block" />
    </Link>
  );
}

export function OrdersList() {
  const hydrated = useHasHydrated();
  const orders = useOrderStore((s) => s.orders);
  const fetchOrders = useOrderStore((s) => s.fetchOrders);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders().catch(() => { });
    }
  }, [isLoggedIn, fetchOrders]);

  if (!hydrated) return null;
  if (!isLoggedIn) return <LoginGate />;

  return (
    <AccountShell activeTab="orders" breadcrumbLabel="My Orders">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-3xl text-white">My Orders</h1>
        <Link
          href="/track-order"
          className="text-xs text-gold hover:underline"
        >
          Track with Order ID &rarr;
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-muted">You haven&apos;t placed any orders yet.</p>
          <Link
            href="/shop"
            className="rounded-full bg-gold px-8 py-3 font-medium text-background transition-colors hover:bg-gold-accent"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {orders.map((order) => (
            <li key={order.id}>
              <OrderListCard order={order} />
            </li>
          ))}
        </ul>
      )}
    </AccountShell>
  );
}

function ShipmentTimeline({ order }: { order: Order }) {
  const steps = getOrderTimeline(order);
  const isCancelled = order.status === "cancelled";

  return (
    <div className="space-y-4">
      <div className="border-t border-white/10 pt-6">
        <h3 className="mb-4 text-sm tracking-widest text-gold uppercase">
          Live Status Timeline
        </h3>

        <ol className="relative ml-2 pl-6">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[5px] w-0.5 bg-white/15"
          />
          {steps.map((step) => {
            return (
              <li key={step.status} className="relative pb-6 last:pb-0">
                <span
                  className={cn(
                    "absolute -left-6 top-1 z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2",
                    step.isCancelled
                      ? "border-red-400 bg-red-400"
                      : step.done
                        ? "border-gold bg-gold ring-4 ring-gold/20"
                        : "border-white/35 bg-background",
                  )}
                />
                <p
                  className={cn(
                    "text-sm font-medium",
                    step.isCancelled
                      ? "text-red-400"
                      : step.done
                        ? "text-gold"
                        : "text-muted",
                  )}
                >
                  {step.label}
                  {step.done && (
                    <span className="ml-2 text-[10px] tracking-wide text-gold/80 uppercase">
                      ✓ Done
                    </span>
                  )}
                </p>
              </li>
            );
          })}
        </ol>
      </div>

      {order.shipment && (
        <div className="rounded border border-white/10 bg-white/[0.02] p-4 text-xs text-muted space-y-1">
          <div className="flex items-center gap-2 text-gold">
            <Truck className="h-4 w-4" />
            <span className="font-medium text-foreground">Courier Tracking</span>
          </div>
          {order.shipment.courier && (
            <p>Courier Partner: <span className="text-white">{order.shipment.courier}</span></p>
          )}
          {order.shipment.awbCode && (
            <p>AWB Tracking Number: <span className="font-mono text-gold">{order.shipment.awbCode}</span></p>
          )}
          <p>Shipment Status: <span className="capitalize text-white">{order.shipment.status.replace(/_/g, " ")}</span></p>
        </div>
      )}
    </div>
  );
}

export function OrderTrack({ orderId, success }: { orderId: string; success?: boolean }) {
  const hydrated = useHasHydrated();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const orders = useOrderStore((s) => s.orders);
  const fetchOrderById = useOrderStore((s) => s.fetchOrderById);
  const cancelOrder = useOrderStore((s) => s.cancelOrder);

  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState("");
  const [fetchedOrder, setFetchedOrder] = useState<Order | null>(null);

  const order = orders.find((o) => o.id === orderId) || fetchedOrder;

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      try {
        const ord = await fetchOrderById(orderId);
        if (active) setFetchedOrder(ord);
      } catch (err) {
        console.error("Failed to load order:", err);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [orderId, fetchOrderById]);

  if (!hydrated) return null;

  if (loading && !order) {
    return (
      <div className="mx-auto w-full max-w-lg px-6 py-24 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        <p className="mt-4 text-sm text-muted">Retrieving order details…</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto w-full max-w-lg px-6 py-24 text-center">
        <h1 className="font-heading text-3xl text-foreground">Order not found</h1>
        <p className="mt-2 text-sm text-muted">
          We couldn&apos;t locate an order with ID &quot;{orderId}&quot;.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/track-order"
            className="rounded-full border border-gold/50 px-6 py-2.5 text-sm text-gold hover:bg-gold/10"
          >
            Track with Phone
          </Link>
          <Link
            href="/orders"
            className="rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-background hover:bg-gold-accent"
          >
            My Orders
          </Link>
        </div>
      </div>
    );
  }

  async function handleCancel() {
    if (!order || cancelling) return;
    const ok = window.confirm("Are you sure you want to cancel this order?");
    if (!ok) return;

    setCancelling(true);
    setCancelError("");
    try {
      const updated = await cancelOrder(order.id);
      setFetchedOrder(updated);
    } catch {
      setCancelError("Could not cancel this order. Please contact customer support.");
    } finally {
      setCancelling(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-3 sm:px-6 py-5 sm:py-10">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-gold">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/orders" className="hover:text-gold">
          My Orders
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground/80">{order.id}</span>
      </nav>

      {success && (
        <div className="mb-6 flex items-center gap-3 border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-400">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <div>
            <p className="font-medium">Order confirmed successfully!</p>
            <p className="text-xs text-emerald-400/80">
              We&apos;ve recorded your order and will begin packaging shortly.
            </p>
          </div>
        </div>
      )}

      {cancelError && (
        <div className="mb-6 border border-red-400/40 bg-red-400/10 p-4 text-sm text-red-400">
          {cancelError}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <section className="border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs tracking-widest text-muted uppercase">{order.id}</p>
              <h2 className="mt-1 font-heading text-2xl text-white">
                Placed on {formatDay(order.createdAt)}
              </h2>
            </div>
            <span
              className={cn(
                "border px-3 py-1 text-xs font-medium uppercase tracking-wider",
                order.status === "cancelled"
                  ? "border-red-400/40 bg-red-400/10 text-red-300"
                  : "border-gold/40 bg-gold/10 text-gold",
              )}
            >
              {getOrderStatusLabel(order)}
            </span>
          </div>

          <ul className="my-6 space-y-3">
            {order.items.map((item, i) => (
              <li key={`${item.productId}-${item.size}-${i}`}>
                <Link
                  href={item.slug ? `/product/${item.slug}` : "/shop"}
                  className="flex gap-3 border border-white/10 p-3 transition-colors hover:border-gold/40"
                >
                  <span className="h-16 w-16 shrink-0 overflow-hidden bg-background-secondary">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div
                        className="h-full w-full"
                        style={{
                          background: `linear-gradient(135deg, ${item.swatch?.[0] || '#1a1a1a'}, ${item.swatch?.[1] || '#3a3a3a'})`,
                        }}
                      />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-white hover:text-gold">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-xs text-muted">
                      Size: UK {item.size} · Qty: {item.qty} · {formatINR(item.price)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <ShipmentTimeline order={order} />

          {order.status === "ordered" && (
            <div className="mt-8 border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                disabled={cancelling}
                className="flex items-center gap-2 border border-red-400/40 px-4 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-400/10 disabled:opacity-50"
              >
                <XCircle className="h-4 w-4" />
                {cancelling ? "Cancelling order…" : "Cancel Order"}
              </button>
              <p className="mt-1 text-[11px] text-muted">
                Orders can be cancelled before packing begins.
              </p>
            </div>
          )}
        </section>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="border border-white/10 bg-white/[0.02] p-5">
            <h3 className="text-sm tracking-widest text-gold uppercase">
              Delivery Address
            </h3>
            <p className="mt-3 text-sm font-medium text-white">{order.address.fullName}</p>
            <p className="mt-1 text-sm text-muted">
              {order.address.addressLine1}
              <br />
              {order.address.city}, {order.address.state} — {order.address.pincode}
            </p>
            <p className="mt-2 text-xs text-muted">Phone: {order.address.phone}</p>
          </div>

          <div className="border border-white/10 bg-white/[0.02] p-5">
            <h3 className="text-sm tracking-widest text-gold uppercase">
              Price Breakdown
            </h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between text-muted">
                <dt>Item Subtotal</dt>
                <dd>{formatINR(order.subtotal)}</dd>
              </div>
              {order.discountAmount ? (
                <div className="flex justify-between text-emerald-400">
                  <dt>Coupon Discount ({order.couponCode})</dt>
                  <dd>-{formatINR(order.discountAmount)}</dd>
                </div>
              ) : null}
              <div className="flex justify-between text-muted">
                <dt>Shipping Fee</dt>
                <dd>{order.shipping === 0 ? "Free" : formatINR(order.shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-white">
                <dt className="font-medium">Total Paid</dt>
                <dd className="font-[family-name:var(--font-poppins)] text-gold font-semibold">
                  {formatINR(order.total)}
                </dd>
              </div>
              <p className="text-xs text-muted capitalize pt-1">
                Payment: <span className="text-foreground uppercase">{order.paymentMethod}</span>
              </p>
            </dl>
          </div>

          <Link
            href="/shop"
            className="block border border-gold/50 px-4 py-3 text-center text-sm text-gold hover:bg-gold/10"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
