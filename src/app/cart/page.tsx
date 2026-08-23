"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore, cartSubtotal } from "@/store/cart";
import { useHasHydrated } from "@/lib/useHasHydrated";
import { formatINR } from "@/lib/format";
import { ProductArt } from "@/components/ProductArt";
import { useAuthStore, type SavedAddress } from "@/store/auth";
import { useOrderStore } from "@/store/orders";
import { LoginModal } from "@/components/LoginModal";
import { AddressFormModal } from "@/components/account/AddressFormModal";
import { cn } from "@/lib/utils";

const PAYMENT_METHODS = [
  { id: "cod", label: "Cash on Delivery" },
  { id: "upi", label: "UPI" },
  { id: "card", label: "Credit / Debit Card" },
] as const;

function CheckoutPanel({ onBack }: { onBack: () => void }) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const addresses = useAuthStore((s) => s.addresses);
  const defaultAddressId = useAuthStore((s) => s.defaultAddressId);
  const placeOrder = useOrderStore((s) => s.placeOrder);
  const subtotal = cartSubtotal(items);

  const [selectedId, setSelectedId] = useState<string | null>(defaultAddressId);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<SavedAddress | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("cod");
  const [placing, setPlacing] = useState(false);

  const selectedAddress = addresses.find((a) => a.id === selectedId) ?? null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedAddress) return;
    setPlacing(true);
    const order = placeOrder(items, selectedAddress, paymentMethod);
    clear();
    router.push(`/orders/${order.id}?success=1`);
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <button onClick={onBack} className="mb-6 text-sm text-gold hover:underline">
        ← Back to Cart
      </button>
      <h1 className="mb-8 font-heading text-3xl text-foreground">Checkout</h1>

      <form onSubmit={submit} className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <section className="border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-xl text-foreground">
                Delivery Address
              </h2>
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setModalOpen(true);
                }}
                className="text-sm text-gold hover:underline"
              >
                + Add New Address
              </button>
            </div>

            {addresses.length === 0 ? (
              <p className="text-sm text-muted">
                No saved address yet. Add one to continue.
              </p>
            ) : (
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={cn(
                      "flex items-start gap-3 border p-4 text-sm transition-colors",
                      selectedId === addr.id
                        ? "border-gold bg-gold/5"
                        : "border-white/10 hover:border-gold/40",
                    )}
                  >
                    <label className="flex flex-1 cursor-pointer items-start gap-3">
                      <input
                        type="radio"
                        name="address"
                        checked={selectedId === addr.id}
                        onChange={() => setSelectedId(addr.id)}
                        className="mt-1 accent-[var(--gold)]"
                      />
                      <span className="flex-1 text-muted">
                        <span className="block text-xs tracking-wide text-gold uppercase">
                          {addr.label}
                          {addr.id === defaultAddressId ? " · Default" : ""}
                        </span>
                        <span className="mt-1 block text-white">{addr.fullName}</span>
                        <span className="mt-1 block">
                          {addr.addressLine1}, {addr.city}, {addr.state} —{" "}
                          {addr.pincode}
                        </span>
                        <span className="mt-1 block">{addr.phone}</span>
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(addr);
                        setModalOpen(true);
                      }}
                      className="shrink-0 text-xs text-gold hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="border border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-4 font-heading text-xl text-foreground">
              Payment Method
            </h2>
            <div className="space-y-2">
              {PAYMENT_METHODS.map((m) => (
                <label
                  key={m.id}
                  className="flex cursor-pointer items-center gap-3 border border-white/10 px-4 py-3 text-sm text-foreground hover:border-gold/40"
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === m.id}
                    onChange={() => setPaymentMethod(m.id)}
                    className="accent-[var(--gold)]"
                  />
                  {m.label}
                </label>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">
              This is a mock checkout — no payment is processed.
            </p>
          </section>
        </div>

        <div className="h-fit space-y-4 border border-white/10 bg-white/[0.03] p-6">
          <h2 className="font-heading text-xl text-foreground">Order Summary</h2>
          <div className="flex justify-between text-sm text-muted">
            <span>Subtotal</span>
            <span className="text-foreground">{formatINR(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted">
            <span>Shipping</span>
            <span className="text-foreground">Free</span>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-4 font-[family-name:var(--font-poppins)] text-lg">
            <span className="text-foreground">Total</span>
            <span className="text-gold">{formatINR(subtotal)}</span>
          </div>
          <button
            type="submit"
            disabled={!selectedAddress || placing}
            className="w-full rounded-full bg-gold px-8 py-3 font-medium text-background transition-colors hover:bg-gold-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            {placing ? "Placing Order…" : "Place Order"}
          </button>
        </div>
      </form>

      <AddressFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editing={editing}
        onSaved={(id) => setSelectedId(id)}
      />
    </div>
  );
}

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const hydrated = useHasHydrated();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [loginOpen, setLoginOpen] = useState(false);

  if (!hydrated) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
        <h1 className="font-heading text-2xl text-foreground">
          Your cart is empty
        </h1>
        <p className="text-muted">Find your next favorite pair.</p>
        <Link
          href="/shop"
          className="rounded-full bg-gold px-8 py-3 font-medium text-background transition-colors hover:bg-gold-accent"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  if (step === "checkout") {
    return <CheckoutPanel onBack={() => setStep("cart")} />;
  }

  const subtotal = cartSubtotal(items);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 font-heading text-3xl text-foreground">Your Cart</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {items.map((item) => (
            <li
              key={`${item.product.id}-${item.size}`}
              className="flex gap-4 py-6"
            >
              <Link
                href={`/product/${item.product.slug}`}
                className="h-24 w-20 shrink-0 overflow-hidden bg-background-secondary"
              >
                <ProductArt product={item.product} className="h-full w-full" />
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="font-heading text-lg text-foreground hover:text-gold"
                    >
                      {item.product.title}
                    </Link>
                    <p className="text-sm text-muted">Size: {item.size}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id, item.size)}
                    className="text-muted hover:text-gold"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 border border-white/10">
                    <button
                      onClick={() =>
                        updateQty(item.product.id, item.size, item.qty - 1)
                      }
                      className="flex h-8 w-8 items-center justify-center text-muted hover:text-gold"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-4 text-center text-sm">{item.qty}</span>
                    <button
                      onClick={() =>
                        updateQty(item.product.id, item.size, item.qty + 1)
                      }
                      className="flex h-8 w-8 items-center justify-center text-muted hover:text-gold"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <span className="font-[family-name:var(--font-poppins)] text-gold">
                    {formatINR(item.product.price * item.qty)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="h-fit space-y-4 border border-white/10 bg-white/[0.03] p-6">
          <h2 className="font-heading text-xl text-foreground">
            Order Summary
          </h2>
          <div className="flex justify-between text-sm text-muted">
            <span>Subtotal</span>
            <span className="text-foreground">{formatINR(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted">
            <span>Shipping</span>
            <span className="text-foreground">Free</span>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-4 font-[family-name:var(--font-poppins)] text-lg">
            <span className="text-foreground">Total</span>
            <span className="text-gold">{formatINR(subtotal)}</span>
          </div>
          <button
            onClick={() => (isLoggedIn ? setStep("checkout") : setLoginOpen(true))}
            className="w-full rounded-full bg-gold px-8 py-3 font-medium text-background transition-colors hover:bg-gold-accent"
          >
            {isLoggedIn ? "Checkout" : "Login to Checkout"}
          </button>
          <p className="text-center text-xs text-muted">
            Checkout is a mock flow — no payment is processed.
          </p>
        </div>
      </div>

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={() => setStep("checkout")}
      />
    </div>
  );
}
