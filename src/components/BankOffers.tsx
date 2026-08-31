import { Tag } from "lucide-react";
import type { BankOffer } from "@/lib/content";

export function BankOffers({ offers }: { offers: BankOffer[] }) {
  if (offers.length === 0) return null;

  return (
    <div>
      <p className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
        <Tag className="h-4 w-4 text-gold" />
        Best Offers
      </p>
      <ul className="space-y-3">
        {offers.map((offer) => (
          <li key={offer.id} className="border border-white/10 bg-white/[0.03] p-3">
            <p className="text-sm text-foreground">{offer.title}</p>
            <p className="mt-0.5 text-xs text-muted">{offer.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
