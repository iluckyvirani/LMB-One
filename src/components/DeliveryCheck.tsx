"use client";

import { useState } from "react";
import { Truck } from "lucide-react";
import { useSettingsStore } from "@/store/settings";
import { api, ApiError } from "@/lib/api";

export function DeliveryCheck() {
  const settings = useSettingsStore((s) => s.settings);
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  async function check() {
    if (!/^\d{6}$/.test(pincode)) {
      setResult("Enter a valid 6-digit pincode");
      return;
    }
    setChecking(true);
    setResult(null);
    try {
      const data = await api.get<
        { serviceable: true; city: string; state: string } | { serviceable: false }
      >(`/delivery/check?pincode=${pincode}`);

      if (!data.serviceable) {
        setResult("We couldn't find that pincode. Please double-check and try again.");
        return;
      }

      const eta =
        settings.deliveryEtaMinDays === settings.deliveryEtaMaxDays
          ? `${settings.deliveryEtaMinDays} days`
          : `${settings.deliveryEtaMinDays}-${settings.deliveryEtaMaxDays} days`;
      const codNote = settings.codEnabled ? " · Cash on Delivery available" : "";
      setResult(`Delivering to ${data.city}, ${data.state} by ${eta}${codNote}`);
    } catch (err) {
      setResult(
        err instanceof ApiError ? err.message : "Could not verify pincode right now.",
      );
    } finally {
      setChecking(false);
    }
  }

  return (
    <div>
      <p className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
        <Truck className="h-4 w-4 text-gold" />
        Delivery Options
      </p>
      <div className="flex max-w-xs gap-2">
        <input
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
            setResult(null);
          }}
          placeholder="Enter pincode"
          inputMode="numeric"
          className="w-full border border-white/15 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-gold"
        />
        <button
          type="button"
          onClick={check}
          disabled={checking}
          className="shrink-0 border border-gold/50 px-4 py-2 text-sm text-gold hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {checking ? "Checking…" : "Check"}
        </button>
      </div>
      {result && <p className="mt-2 text-sm text-muted">{result}</p>}
    </div>
  );
}
