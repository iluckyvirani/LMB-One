import { Tag } from "lucide-react";
import { BANK_OFFERS } from "@/lib/productDetails";

export function BankOffers() {
  return (
    <div>
      <p className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
        <Tag className="h-4 w-4 text-gold" />
        Best Offers
      </p>
      <ul className="space-y-3">
        {BANK_OFFERS.map((offer) => (
          <li key={offer.title} className="border border-white/10 bg-white/[0.03] p-3">
            <p className="text-sm text-foreground">{offer.title}</p>
            <p className="mt-0.5 text-xs text-muted">{offer.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
