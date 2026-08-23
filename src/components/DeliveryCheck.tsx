"use client";

import { useState } from "react";
import { Truck } from "lucide-react";

export function DeliveryCheck() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function check() {
    if (!/^\d{6}$/.test(pincode)) {
      setResult("Enter a valid 6-digit pincode");
      return;
    }
    const days = 3 + (Number(pincode) % 4);
    setResult(`Delivery by ${days} days · Cash on Delivery available`);
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
          className="shrink-0 border border-gold/50 px-4 py-2 text-sm text-gold hover:bg-gold/10"
        >
          Check
        </button>
      </div>
      {result && <p className="mt-2 text-sm text-muted">{result}</p>}
    </div>
  );
}
