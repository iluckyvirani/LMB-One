"use client";

import { create } from "zustand";
import { api } from "@/lib/api";

export type PublicSettings = {
  storeName: string;
  tagline: string;
  supportEmail: string;
  supportPhone: string;
  whatsapp: string;
  taxPercent: number;
  codEnabled: boolean;
  codMaxAmount: number;
  freeShippingThreshold: number;
  shippingFee: number;
  deliveryEtaMinDays: number;
  deliveryEtaMaxDays: number;
  newsletterHeading: string;
  newsletterSubtext: string;
};

const DEFAULT_SETTINGS: PublicSettings = {
  storeName: "LMB Shoes",
  tagline: "Step into luxury",
  supportEmail: "",
  supportPhone: "",
  whatsapp: "",
  taxPercent: 0,
  codEnabled: true,
  codMaxAmount: 10000,
  freeShippingThreshold: 0,
  shippingFee: 99,
  deliveryEtaMinDays: 3,
  deliveryEtaMaxDays: 7,
  newsletterHeading: "Get 10% off your first order",
  newsletterSubtext: "Sign up for drops, restocks and members-only offers.",
};

type SettingsState = {
  settings: PublicSettings;
  loaded: boolean;
  fetchSettings: () => Promise<void>;
};

export const useSettingsStore = create<SettingsState>()((set) => ({
  settings: DEFAULT_SETTINGS,
  loaded: false,
  fetchSettings: async () => {
    const settings = await api.get<PublicSettings>("/settings/public");
    set({ settings, loaded: true });
  },
}));

/** Mirrors the server's shipping calc in orders.controller.js — an estimate for display;
 * the server independently computes and enforces the authoritative charge at order time. */
export function computeShipping(subtotal: number, settings: PublicSettings) {
  if (settings.freeShippingThreshold > 0 && subtotal < settings.freeShippingThreshold) {
    return settings.shippingFee;
  }
  return 0;
}
