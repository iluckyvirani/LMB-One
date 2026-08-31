import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Banknote,
  Package,
  CreditCard,
  Clock,
  Star,
  Heart,
  Award,
  CheckCircle,
  Gift,
  type LucideIcon,
} from "lucide-react";
import { fetchTrustItems } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  truck: Truck,
  "rotate-ccw": RotateCcw,
  "shield-check": ShieldCheck,
  banknote: Banknote,
  package: Package,
  "credit-card": CreditCard,
  clock: Clock,
  star: Star,
  heart: Heart,
  award: Award,
  "check-circle": CheckCircle,
  gift: Gift,
};

export async function TrustStrip() {
  const items = await fetchTrustItems();
  if (items.length === 0) return null;

  return (
    <section className="border-b border-white/10 bg-background-secondary/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map((item) => {
          const Icon = ICONS[item.icon] ?? Truck;
          return (
            <div key={item.id} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
