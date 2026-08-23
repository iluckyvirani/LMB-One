"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useAuthStore, type AddressLabel, type SavedAddress, type UserAddress } from "@/store/auth";

const EMPTY: UserAddress = {
  fullName: "",
  phone: "",
  addressLine1: "",
  city: "",
  state: "",
  pincode: "",
  label: "Home",
};

export function AddressFormModal({
  open,
  onClose,
  editing,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  editing: SavedAddress | null;
  onSaved?: (id: string) => void;
}) {
  const upsertAddress = useAuthStore((s) => s.upsertAddress);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<UserAddress>(EMPTY);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) setForm(editing ?? EMPTY);
  }, [open, editing]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const canSubmit =
    form.fullName.trim() &&
    /^\d{10}$/.test(form.phone.trim()) &&
    form.addressLine1.trim() &&
    form.city.trim() &&
    form.state.trim() &&
    /^\d{6}$/.test(form.pincode.trim());

  const inputClass =
    "w-full border border-white/15 bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-gold placeholder:text-muted";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    const id = upsertAddress(editing ? { ...form, id: editing.id } : form);
    onSaved?.(id);
    onClose();
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg border border-white/10 bg-background-secondary shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 text-muted hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="border-b border-white/10 bg-gold/10 px-6 py-5 pr-12">
          <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
            {editing ? "Edit Address" : "Add Address"}
          </p>
          <h2 className="mt-1 font-heading text-2xl text-white">
            {editing ? "Update delivery address" : "New delivery address"}
          </h2>
        </div>

        <form onSubmit={submit} className="space-y-3 px-6 py-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              required
              placeholder="Full name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className={inputClass}
            />
            <input
              required
              inputMode="numeric"
              placeholder="10-digit mobile"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
              }
              className={inputClass}
            />
            <input
              required
              placeholder="Address line"
              value={form.addressLine1}
              onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
              className={`${inputClass} sm:col-span-2`}
            />
            <input
              required
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className={inputClass}
            />
            <input
              required
              placeholder="State"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className={inputClass}
            />
            <input
              required
              inputMode="numeric"
              placeholder="Pincode"
              value={form.pincode}
              onChange={(e) =>
                setForm({ ...form, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })
              }
              className={inputClass}
            />
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-muted">
              Address Type
            </p>
            <div className="flex gap-2">
              {(["Home", "Work", "Other"] as AddressLabel[]).map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setForm({ ...form, label })}
                  className={`border px-4 py-2 text-sm transition-colors ${
                    form.label === label
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-white/15 text-muted hover:border-gold/40"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-full bg-gold px-8 py-3 font-medium text-background transition-colors hover:bg-gold-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            {editing ? "Save Address" : "Add Address"}
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
}
