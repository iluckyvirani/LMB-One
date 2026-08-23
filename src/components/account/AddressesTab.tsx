"use client";

import { useState } from "react";
import { MapPin, Pencil, Trash2 } from "lucide-react";
import { useAuthStore, type SavedAddress } from "@/store/auth";
import { cn } from "@/lib/utils";
import { AddressFormModal } from "@/components/account/AddressFormModal";

export function AddressesTab() {
  const addresses = useAuthStore((s) => s.addresses);
  const defaultAddressId = useAuthStore((s) => s.defaultAddressId);
  const setDefaultAddress = useAuthStore((s) => s.setDefaultAddress);
  const removeAddress = useAuthStore((s) => s.removeAddress);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<SavedAddress | null>(null);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-heading text-3xl text-white">Manage Addresses</h1>
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-background hover:bg-gold-accent"
        >
          + Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 py-10 text-center">
          <MapPin className="h-8 w-8 text-muted" />
          <p className="text-muted">No saved addresses yet.</p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {addresses.map((addr) => {
            const isDefault = addr.id === defaultAddressId;
            return (
              <li
                key={addr.id}
                className={cn(
                  "border p-4 text-sm text-muted",
                  isDefault ? "border-gold/40 bg-gold/5" : "border-white/10",
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-wide text-gold uppercase">
                      {addr.label}
                      {isDefault ? " · Default" : ""}
                    </p>
                    <p className="mt-2 text-white">{addr.fullName}</p>
                    <p className="mt-1">
                      {addr.addressLine1}
                      <br />
                      {addr.city}, {addr.state} — {addr.pincode}
                      <br />
                      {addr.phone}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2 text-xs">
                    {!isDefault && (
                      <button
                        type="button"
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-gold hover:underline"
                      >
                        Set as default
                      </button>
                    )}
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(addr);
                          setModalOpen(true);
                        }}
                        className="flex items-center gap-1 text-muted hover:text-gold"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => removeAddress(addr.id)}
                        className="flex items-center gap-1 text-muted hover:text-gold"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <AddressFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editing={editing}
      />
    </div>
  );
}
