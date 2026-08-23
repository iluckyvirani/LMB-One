"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AddressLabel = "Home" | "Work" | "Other";

export type UserAddress = {
  fullName: string;
  phone: string;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
  label: AddressLabel;
};

export type SavedAddress = UserAddress & { id: string };

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
};

type AuthState = {
  isLoggedIn: boolean;
  phone: string | null;
  name: string | null;
  profile: UserProfile | null;
  addresses: SavedAddress[];
  defaultAddressId: string | null;
  /** Mock OTP — always resolves; no real SMS is sent */
  requestOtp: (phone: string) => Promise<{ ok: true }>;
  verifyOtp: (phone: string, code: string) => { ok: true } | { ok: false; error: string };
  updateProfile: (profile: Partial<UserProfile> & { phone?: string }) => void;
  /** Adds a new address, or updates one if it already has an id. Returns the saved id. */
  upsertAddress: (address: UserAddress | SavedAddress) => string;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  logout: () => void;
};

function defaultProfile(): UserProfile {
  return { firstName: "LMB", lastName: "Customer", email: "" };
}

function displayName(profile: UserProfile | null, fallback: string) {
  if (!profile) return fallback;
  const full = `${profile.firstName} ${profile.lastName}`.trim();
  return full || fallback;
}

function newAddressId() {
  return `addr-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      phone: null,
      name: null,
      profile: null,
      addresses: [],
      defaultAddressId: null,

      requestOtp: async () => {
        return { ok: true as const };
      },

      verifyOtp: (phone, code) => {
        if (!/^\d{6}$/.test(code.trim())) {
          return { ok: false as const, error: "Enter the 6-digit OTP (demo: 123456)" };
        }
        const profile = defaultProfile();
        set({
          isLoggedIn: true,
          phone,
          name: displayName(profile, "LMB Customer"),
          profile,
        });
        return { ok: true as const };
      },

      updateProfile: (patch) => {
        const current = get().profile ?? {
          firstName: "LMB",
          lastName: "Customer",
          email: "",
        };
        const next: UserProfile = { ...current, ...patch };
        const name = displayName(next, "LMB Customer");
        const phone = patch.phone ?? get().phone;
        set({ profile: next, name, phone });
      },

      upsertAddress: (address) => {
        const hasId = "id" in address && !!address.id;
        const saved: SavedAddress = hasId
          ? (address as SavedAddress)
          : { ...(address as UserAddress), id: newAddressId() };
        const prev = get().addresses;
        const idx = prev.findIndex((a) => a.id === saved.id);
        const addresses =
          idx >= 0 ? prev.map((a, i) => (i === idx ? saved : a)) : [...prev, saved];
        const defaultAddressId = get().defaultAddressId ?? saved.id;
        set({ addresses, defaultAddressId });
        return saved.id;
      },

      removeAddress: (id) => {
        const addresses = get().addresses.filter((a) => a.id !== id);
        const defaultAddressId =
          get().defaultAddressId === id
            ? (addresses[0]?.id ?? null)
            : get().defaultAddressId;
        set({ addresses, defaultAddressId });
      },

      setDefaultAddress: (id) => set({ defaultAddressId: id }),

      logout: () =>
        set({ isLoggedIn: false, phone: null, name: null, profile: null }),
    }),
    { name: "lmb-shoes-auth" },
  ),
);

export function isValidOtp(otp: string) {
  return /^\d{6}$/.test(otp.trim());
}

/** Short first name for navbar (Flipkart-style) */
export function shortDisplayName(name: string | null, phone: string | null) {
  if (name?.trim()) return name.trim().split(/\s+/)[0];
  if (phone) return `••${phone.slice(-4)}`;
  return "Account";
}
