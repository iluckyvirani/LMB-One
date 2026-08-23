import Link from "next/link";
import { BRAND, FOOTER_COLUMNS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background-secondary">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-2">
          <span className="font-heading text-lg text-foreground">
            {BRAND.storeName}
          </span>
          <p className="max-w-xs text-sm text-muted">{BRAND.description}</p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title} className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-gold/80">
              {col.title}
            </p>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {BRAND.storeName}. All rights reserved.
      </div>
    </footer>
  );
}
