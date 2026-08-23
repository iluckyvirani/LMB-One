import { Truck, RotateCcw, ShieldCheck, Banknote } from "lucide-react";

const ITEMS = [
  { Icon: Truck, label: "Free Shipping", desc: "On every order, no minimum" },
  { Icon: RotateCcw, label: "7-Day Returns", desc: "Easy exchanges & refunds" },
  { Icon: Banknote, label: "Cash on Delivery", desc: "Pay when it arrives" },
  { Icon: ShieldCheck, label: "Secure Checkout", desc: "Your details stay safe" },
];

export function TrustStrip() {
  return (
    <section className="border-b border-white/10 bg-background-secondary/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
        {ITEMS.map(({ Icon, label, desc }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
