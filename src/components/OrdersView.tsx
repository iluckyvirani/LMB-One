"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
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
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function OrderListCard({ order }: { order: Order }) {
  const first = order.items[0];
  const moreCount = order.items.reduce((n, i) => n + i.qty, 0) - (first?.qty ?? 0);

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
                background: `linear-gradient(135deg, ${first.swatch[0]}, ${first.swatch[1]})`,
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
        <span className="mt-2 inline-block border border-gold/40 px-2 py-0.5 text-[10px] tracking-wide text-gold uppercase">
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

  if (!hydrated) return null;

  return (
    <AccountShell activeTab="orders" breadcrumbLabel="My Orders">
      <h1 className="font-heading text-3xl text-white">My Orders</h1>

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
  const currentIndex = steps.reduce(
    (last, s, i) => (s.done ? i : last),
    0,
  );
  const n = steps.length;
  const progressPct = n <= 1 ? 0 : (currentIndex / (n - 1)) * 100;

  return (
    <ol className="relative ml-1.5 pl-8">
      <span
        aria-hidden
        className="absolute top-2 bottom-2 left-[5px] w-0.5 bg-white/15"
      />
      <span
        aria-hidden
        className="absolute top-2 left-[5px] w-0.5 bg-gold transition-[height] duration-500"
        style={{ height: `calc(${progressPct}% - 0.25rem)` }}
      />
      {steps.map((step, i) => {
        const isCurrent = i === currentIndex;
        return (
          <li key={step.status} className="relative pb-7 last:pb-0">
            <span
              className={cn(
                "absolute -left-8 top-1 z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2",
                step.done ? "border-gold bg-gold" : "border-white/35 bg-background",
                isCurrent && step.done && "ring-4 ring-gold/25",
              )}
            />
            <p
              className={cn(
                "font-[family-name:var(--font-poppins)] text-sm",
                step.done ? "text-gold" : "text-muted",
                isCurrent && "font-medium",
              )}
            >
              {step.label}
              {isCurrent && step.done && (
                <span className="ml-2 text-[10px] tracking-wide text-gold/80 uppercase">
                  Current
                </span>
              )}
            </p>
            <p className="mt-0.5 text-xs text-muted">
              {step.at
                ? step.at.toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Pending"}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

export function OrderTrack({ orderId, success }: { orderId: string; success?: boolean }) {
  const hydrated = useHasHydrated();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const orders = useOrderStore((s) => s.orders);
  const order = orders.find((o) => o.id === orderId);

  if (!hydrated) return null;
  if (!isLoggedIn) return <LoginGate />;

  if (!order) {
    return (
      <div className="mx-auto w-full max-w-lg px-6 py-24 text-center">
        <h1 className="font-heading text-3xl text-foreground">Order not found</h1>
        <Link
          href="/orders"
          className="mt-6 inline-block rounded-full bg-gold px-8 py-3 font-medium text-background hover:bg-gold-accent"
        >
          View all orders
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
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
        <p className="mb-6 border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold">
          Order placed successfully. Track it below.
        </p>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <section className="border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs tracking-widest text-muted uppercase">{order.id}</p>
          <h2 className="mt-1 font-heading text-2xl text-white">
            {formatDay(order.createdAt)}
          </h2>

          <ul className="my-6 space-y-3">
            {order.items.map((item, i) => (
              <li key={`${item.productId}-${item.size}-${i}`}>
                <Link
                  href={`/product/${item.slug}`}
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
                          background: `linear-gradient(135deg, ${item.swatch[0]}, ${item.swatch[1]})`,
                        }}
                      />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-white hover:text-gold">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-xs text-muted">
                      Size {item.size} · Qty {item.qty} · {formatINR(item.price)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <ShipmentTimeline order={order} />
        </section>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="border border-white/10 bg-white/[0.02] p-5">
            <h3 className="text-sm tracking-widest text-gold uppercase">
              Delivery details
            </h3>
            <p className="mt-3 text-sm text-white">{order.address.fullName}</p>
            <p className="mt-1 text-sm text-muted">
              {order.address.addressLine1}
              <br />
              {order.address.city}, {order.address.state} — {order.address.pincode}
            </p>
            <p className="mt-2 text-sm text-muted">{order.address.phone}</p>
          </div>
          <div className="border border-white/10 bg-white/[0.02] p-5">
            <h3 className="text-sm tracking-widest text-gold uppercase">
              Price details
            </h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between text-muted">
                <dt>Subtotal</dt>
                <dd>{formatINR(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between text-muted">
                <dt>Shipping</dt>
                <dd>Free</dd>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-white">
                <dt>Total</dt>
                <dd className="font-[family-name:var(--font-poppins)] text-gold">
                  {formatINR(order.total)}
                </dd>
              </div>
              <p className="text-xs text-muted capitalize">
                Paid by: {order.paymentMethod}
              </p>
            </dl>
          </div>
          <Link
            href="/orders"
            className="block border border-gold/50 px-4 py-3 text-center text-sm text-gold hover:bg-gold/10"
          >
            All orders
          </Link>
        </aside>
      </div>
    </div>
  );
}
