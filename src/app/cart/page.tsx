"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, Tag, Check, X, ShieldCheck, Truck } from "lucide-react";
import { useCartStore, cartSubtotal } from "@/store/cart";
import { useHasHydrated } from "@/lib/useHasHydrated";
import { formatINR } from "@/lib/format";
import { ProductArt } from "@/components/ProductArt";
import { useAuthStore, type SavedAddress } from "@/store/auth";
import { useOrderStore } from "@/store/orders";
import { useSettingsStore, computeShipping } from "@/store/settings";
import { LoginModal } from "@/components/LoginModal";
import { AddressFormModal } from "@/components/account/AddressFormModal";
import { cn } from "@/lib/utils";
import { api, ApiError } from "@/lib/api";

const PAYMENT_METHODS = [
  { id: "cod", label: "Cash on Delivery (COD)" },
  { id: "upi", label: "UPI (Google Pay, PhonePe, Paytm, QR)" },
  { id: "card", label: "Credit / Debit Card (Visa, MasterCard, RuPay)" },
] as const;

function CouponInput({
  subtotal,
  appliedCode,
  discount,
  onApply,
  onRemove,
}: {
  subtotal: number;
  appliedCode: string;
  discount: number;
  onApply: (code: string, discount: number) => void;
  onRemove: () => void;
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleApply(inputCode: string) {
    const c = inputCode.trim().toUpperCase();
    if (!c) return;
    setLoading(true);
    setError("");
    try {
      const res = await api.post<{ code: string; discount: number }>("/coupons/apply", {
        code: c,
        subtotal,
      });
      onApply(res.code, res.discount);
      setCode("");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Invalid promo code");
    } finally {
      setLoading(false);
    }
  }

  if (appliedCode) {
    return (
      <div className="flex items-center justify-between rounded border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-400">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4" />
          <span>
            Code <strong>{appliedCode}</strong> applied (-{formatINR(discount)})
          </span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="text-muted hover:text-red-400"
          aria-label="Remove coupon"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            if (error) setError("");
          }}
          placeholder="Promo code (e.g. WELCOME10)"
          className="w-full border border-white/15 bg-background px-3 py-2 text-xs uppercase text-foreground outline-none focus:border-gold"
        />
        <button
          type="button"
          onClick={() => handleApply(code)}
          disabled={!code.trim() || loading}
          className="shrink-0 border border-gold px-4 py-2 text-xs font-medium text-gold hover:bg-gold/10 disabled:opacity-40"
        >
          {loading ? "Checking…" : "Apply"}
        </button>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-muted">
        <span>Try:</span>
        <button
          type="button"
          onClick={() => handleApply("WELCOME10")}
          className="rounded bg-white/5 px-1.5 py-0.5 text-gold hover:bg-white/10"
        >
          WELCOME10 (10% off)
        </button>
        <button
          type="button"
          onClick={() => handleApply("LMB500")}
          className="rounded bg-white/5 px-1.5 py-0.5 text-gold hover:bg-white/10"
        >
          LMB500 (₹500 off)
        </button>
      </div>
    </div>
  );
}

function CheckoutPanel({ onBack }: { onBack: () => void }) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const addresses = useAuthStore((s) => s.addresses);
  const defaultAddressId = useAuthStore((s) => s.defaultAddressId);
  const placeOrder = useOrderStore((s) => s.placeOrder);
  const settings = useSettingsStore((s) => s.settings);

  const subtotal = cartSubtotal(items);
  const shipping = computeShipping(subtotal, settings);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const total = Math.max(0, subtotal - discount + shipping);
  const codEligible = settings.codEnabled && total <= settings.codMaxAmount;

  const [selectedId, setSelectedId] = useState<string | null>(defaultAddressId);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<SavedAddress | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>(
    settings.codEnabled ? "cod" : "upi",
  );
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const selectedAddress = addresses.find((a) => a.id === selectedId) ?? null;

  useEffect(() => {
    if (paymentMethod === "cod" && !codEligible) setPaymentMethod("upi");
  }, [paymentMethod, codEligible]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedAddress || placing) return;
    setPlacing(true);
    setError("");
    try {
      const order = await placeOrder(items, selectedAddress, paymentMethod, couponCode);
      await clear();
      router.push(`/orders/${order.id}?success=1`);
    } catch {
      setError("Could not place your order. Please try again.");
      setPlacing(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-3 sm:px-6 py-6 sm:py-12">
      <button onClick={onBack} className="mb-6 text-sm text-gold hover:underline">
        ← Back to Cart
      </button>
      <h1 className="mb-8 font-heading text-3xl text-foreground">Checkout</h1>

      <form onSubmit={submit} className="grid gap-10 lg:grid-cols-[1fr_340px]">
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
                        <span className="mt-1 block font-medium text-white">{addr.fullName}</span>
                        <span className="mt-1 block">
                          {addr.addressLine1}, {addr.city}, {addr.state} — {addr.pincode}
                        </span>
                        <span className="mt-1 block text-xs">Phone: {addr.phone}</span>
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
              {PAYMENT_METHODS.map((m) => {
                const disabled = m.id === "cod" && !codEligible;
                return (
                  <label
                    key={m.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 border border-white/10 px-4 py-3 text-sm text-foreground hover:border-gold/40",
                      disabled && "cursor-not-allowed opacity-40 hover:border-white/10",
                      paymentMethod === m.id && "border-gold bg-gold/5",
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      disabled={disabled}
                      checked={paymentMethod === m.id}
                      onChange={() => setPaymentMethod(m.id)}
                      className="accent-[var(--gold)]"
                    />
                    {m.label}
                  </label>
                );
              })}
            </div>
            {!settings.codEnabled && (
              <p className="mt-3 text-xs text-muted">
                Cash on Delivery is currently unavailable.
              </p>
            )}
            {settings.codEnabled && !codEligible && (
              <p className="mt-3 text-xs text-muted">
                Cash on Delivery isn&apos;t available for orders above{" "}
                {formatINR(settings.codMaxAmount)}.
              </p>
            )}
            <p className="mt-3 text-xs text-muted/80">
              Demo Mode: You can select any payment option to simulate order completion.
            </p>
          </section>
        </div>

        <div className="h-fit space-y-4 border border-white/10 bg-white/[0.03] p-6">
          <h2 className="font-heading text-xl text-foreground">Order Summary</h2>

          <div className="py-2">
            <CouponInput
              subtotal={subtotal}
              appliedCode={couponCode}
              discount={discount}
              onApply={(c, d) => {
                setCouponCode(c);
                setDiscount(d);
              }}
              onRemove={() => {
                setCouponCode("");
                setDiscount(0);
              }}
            />
          </div>

          <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span className="text-foreground">{formatINR(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount ({couponCode})</span>
                <span>-{formatINR(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted">
              <span>Shipping</span>
              <span className="text-foreground">
                {shipping === 0 ? "Free" : formatINR(shipping)}
              </span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-3 font-[family-name:var(--font-poppins)] text-lg">
              <span className="text-foreground">Total</span>
              <span className="text-gold font-semibold">{formatINR(total)}</span>
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={!selectedAddress || placing}
            className="w-full rounded-full bg-gold px-8 py-3 font-medium text-background transition-colors hover:bg-gold-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            {placing ? "Placing Order…" : "Confirm Order"}
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
  const settings = useSettingsStore((s) => s.settings);
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [loginOpen, setLoginOpen] = useState(false);

  if (!hydrated) return null;

  const subtotal = cartSubtotal(items);
  const shipping = computeShipping(subtotal, settings);
  const freeThreshold = settings.freeShippingThreshold;
  const awayFromFree = freeThreshold > 0 && subtotal < freeThreshold ? freeThreshold - subtotal : 0;

  if (step === "checkout") {
    return <CheckoutPanel onBack={() => setStep("cart")} />;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
        <h1 className="font-heading text-3xl text-foreground">Your cart is empty</h1>
        <p className="text-muted">Explore our collections and discover your next pair.</p>
        <Link
          href="/shop"
          className="rounded-full bg-gold px-8 py-3 font-medium text-background transition-colors hover:bg-gold-accent"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-3 sm:px-6 py-6 sm:py-12">
      <h1 className="mb-8 font-heading text-3xl text-foreground">Shopping Bag ({items.length})</h1>

      {awayFromFree > 0 && (
        <div className="mb-6 flex items-center gap-2 border border-gold/30 bg-gold/5 px-4 py-3 text-xs text-gold">
          <Truck className="h-4 w-4 shrink-0" />
          <span>
            Add <strong>{formatINR(awayFromFree)}</strong> more to your cart to get <strong>Free Express Shipping</strong>!
          </span>
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={`${item.product.id}-${item.size}`}
              className="flex gap-4 border border-white/10 bg-white/[0.03] p-4 sm:p-5"
            >
              <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden bg-background-secondary sm:w-28">
                <ProductArt product={item.product} className="h-full w-full" />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs tracking-widest text-gold uppercase">
                      {item.product.collection}
                    </p>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="font-heading text-lg text-foreground hover:text-gold"
                    >
                      {item.product.title}
                    </Link>
                    <p className="text-xs text-muted">
                      Size: UK {item.size} · Color: {item.product.colorway}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id, item.size)}
                    className="text-muted transition-colors hover:text-red-400"
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
                  <span className="font-[family-name:var(--font-poppins)] text-gold font-medium">
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
            <span>Estimated Shipping</span>
            <span className="text-foreground">
              {shipping === 0 ? "Free" : formatINR(shipping)}
            </span>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-4 font-[family-name:var(--font-poppins)] text-lg">
            <span className="text-foreground">Estimated Total</span>
            <span className="text-gold font-semibold">{formatINR(subtotal + shipping)}</span>
          </div>
          <button
            onClick={() => (isLoggedIn ? setStep("checkout") : setLoginOpen(true))}
            className="w-full rounded-full bg-gold px-8 py-3 font-medium text-background transition-colors hover:bg-gold-accent"
          >
            {isLoggedIn ? "Proceed to Checkout" : "Login to Checkout"}
          </button>

          <div className="flex items-center justify-center gap-2 pt-2 text-xs text-muted">
            <ShieldCheck className="h-4 w-4 text-gold" />
            <span>Guaranteed Safe &amp; Secure Checkout</span>
          </div>
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
