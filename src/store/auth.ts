"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api, ApiError, setToken } from "@/lib/api";

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

export type SavedAddress = UserAddress & { id: string; isDefault?: boolean };

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
};

type CustomerResponse = {
  id: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string;
};

type AuthState = {
  isLoggedIn: boolean;
  phone: string | null;
  name: string | null;
  profile: UserProfile | null;
  addresses: SavedAddress[];
  defaultAddressId: string | null;
  requestOtp: (
    phone: string,
  ) => Promise<{ ok: true; demoCode?: string } | { ok: false; error: string }>;
  verifyOtp: (
    phone: string,
    code: string,
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
  updateProfile: (profile: Partial<UserProfile> & { phone?: string }) => Promise<void>;
  fetchAddresses: () => Promise<void>;
  /** Adds a new address, or updates one if it already has an id. Returns the saved id. */
  upsertAddress: (address: UserAddress | SavedAddress) => Promise<string>;
  removeAddress: (id: string) => Promise<void>;
  setDefaultAddress: (id: string) => Promise<void>;
  logout: () => void;
};

function toProfile(c: CustomerResponse): UserProfile {
  return {
    firstName: c.firstName ?? "LMB",
    lastName: c.lastName ?? "",
    email: c.email ?? "",
  };
}

function displayName(profile: UserProfile | null, fallback: string) {
  if (!profile) return fallback;
  const full = `${profile.firstName} ${profile.lastName}`.trim();
  return full || fallback;
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

      requestOtp: async (phone) => {
        try {
          const { demoCode } = await api.post<{ ok: true; demoCode?: string }>(
            "/customer/request-otp",
            { phone },
          );
          return { ok: true as const, demoCode };
        } catch (err) {
          const message = err instanceof ApiError ? err.message : "Could not reach the server";
          return { ok: false as const, error: message };
        }
      },

      verifyOtp: async (phone, code) => {
        try {
          const { token, customer } = await api.post<{ token: string; customer: CustomerResponse }>(
            "/customer/verify-otp",
            { phone, code },
          );
          setToken(token);
          const profile = toProfile(customer);
          set({
            isLoggedIn: true,
            phone: customer.phone,
            name: displayName(profile, "LMB Customer"),
            profile,
          });
          get().fetchAddresses().catch(() => {});
          return { ok: true as const };
        } catch (err) {
          const message = err instanceof ApiError ? err.message : "Could not verify OTP";
          return { ok: false as const, error: message };
        }
      },

      updateProfile: async (patch) => {
        const updated = await api.put<CustomerResponse>("/customer/profile", {
          firstName: patch.firstName,
          lastName: patch.lastName,
          email: patch.email,
          phone: patch.phone,
        });
        const profile = toProfile(updated);
        set({ profile, name: displayName(profile, "LMB Customer"), phone: updated.phone });
      },

      fetchAddresses: async () => {
        const addresses = await api.get<SavedAddress[]>("/customer/addresses");
        set({
          addresses,
          defaultAddressId: addresses.find((a) => a.isDefault)?.id ?? addresses[0]?.id ?? null,
        });
      },

      upsertAddress: async (address) => {
        const hasId = "id" in address && !!address.id;
        const saved = hasId
          ? await api.put<SavedAddress>(`/customer/addresses/${(address as SavedAddress).id}`, address)
          : await api.post<SavedAddress>("/customer/addresses", address);
        const prev = get().addresses;
        const idx = prev.findIndex((a) => a.id === saved.id);
        const addresses = idx >= 0 ? prev.map((a, i) => (i === idx ? saved : a)) : [...prev, saved];
        const defaultAddressId = saved.isDefault ? saved.id : (get().defaultAddressId ?? saved.id);
        set({ addresses, defaultAddressId });
        return saved.id;
      },

      removeAddress: async (id) => {
        await api.delete(`/customer/addresses/${id}`);
        const addresses = get().addresses.filter((a) => a.id !== id);
        const defaultAddressId =
          get().defaultAddressId === id ? (addresses[0]?.id ?? null) : get().defaultAddressId;
        set({ addresses, defaultAddressId });
      },

      setDefaultAddress: async (id) => {
        await api.put(`/customer/addresses/${id}`, { isDefault: true });
        set({ defaultAddressId: id });
      },

      logout: () => {
        setToken(null);
        set({
          isLoggedIn: false,
          phone: null,
          name: null,
          profile: null,
          addresses: [],
          defaultAddressId: null,
        });
      },
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
