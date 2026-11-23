"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  Search,
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  ChevronRight,
  Truck,
  Ruler,
  RotateCcw,
  HelpCircle,
  Phone,
  Sparkles,
  ArrowRight,
  Flame,
  Star,
} from "lucide-react";
import { BRAND } from "@/lib/constants";
import { shortDisplayName, useAuthStore } from "@/store/auth";
import { useHasHydrated } from "@/lib/useHasHydrated";
import { LoginModal } from "@/components/LoginModal";

const CATEGORIES = [
  { href: "/shop?category=men", label: "Men's Footwear", tag: "Oxford, Loafers & Boots" },
  { href: "/shop?category=women", label: "Women's Collection", tag: "Heels, Flats & Party" },
  { href: "/shop?category=sports", label: "Sports & Performance", tag: "Running, Trainers & Gym" },
  { href: "/shop?category=kids", label: "Kids' Active", tag: "Sneakers & Toddlers" },
];

const CURATIONS = [
  { href: "/shop?tag=new-arrival", label: "New Arrivals 2026", icon: Sparkles, color: "text-amber-400" },
  { href: "/shop?tag=bestseller", label: "Best Sellers", icon: Flame, color: "text-orange-400" },
  { href: "/shop?tag=party-wear", label: "The Gala Édition", icon: Star, color: "text-gold" },
];

const HELP_LINKS = [
  { href: "/track-order", label: "Track Your Order", icon: Truck },
  { href: "/size-guide", label: "Size & Fit Guide", icon: Ruler },
  { href: "/returns-refunds", label: "7-Day Free Exchange", icon: RotateCcw },
  { href: "/shipping-policy", label: "Shipping Policy", icon: Truck },
  { href: "/faqs", label: "FAQs & Care Guide", icon: HelpCircle },
  { href: "/contact", label: "Customer Concierge", icon: Phone },
];

export function MobileMenuDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);

  const hydrated = useHasHydrated();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const name = useAuthStore((s) => s.name);
  const phone = useAuthStore((s) => s.phone);
  const logout = useAuthStore((s) => s.logout);

  const displayName = shortDisplayName(name, phone);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    onClose();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Android Material Left Navigation Drawer */}
      <div className="fixed inset-y-0 left-0 flex max-w-full pr-10">
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="w-screen max-w-[310px] sm:max-w-xs border-r border-white/10 bg-[#0d0d0d] shadow-2xl flex flex-col h-full animate-in slide-in-from-left duration-300"
        >
          {/* Android Drawer Header */}
          <div className="border-b border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/15 text-gold font-heading text-lg font-bold">
                  {hydrated && isLoggedIn && name ? name[0].toUpperCase() : "L"}
                </div>
                <div className="min-w-0">
                  {hydrated && isLoggedIn ? (
                    <>
                      <p className="truncate text-sm font-semibold text-white">
                        {name || "Valued Patron"}
                      </p>
                      <p className="truncate text-xs text-muted">{phone || "Member"}</p>
                    </>
                  ) : (
                    <>
                      <p className="font-heading text-base font-semibold text-white">
                        {BRAND.storeName}
                      </p>
                      <p className="text-xs text-gold">Step into Luxury</p>
                    </>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!isLoggedIn && (
              <button
                type="button"
                onClick={() => {
                  setLoginOpen(true);
                }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-background hover:bg-gold-accent transition-colors shadow-sm"
              >
                <User className="h-3.5 w-3.5" />
                Login / Register
              </button>
            )}
          </div>

          {/* Search Bar inside Drawer */}
          <div className="border-b border-white/10 p-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search shoes, styles…"
                className="w-full rounded-lg border border-white/15 bg-white/[0.04] py-2 pl-9 pr-3 text-xs text-foreground placeholder:text-muted/60 outline-none focus:border-gold"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gold" />
            </form>
          </div>

          {/* Drawer Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
            {/* Curated Drops */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gold/80 px-2 mb-2">
                Featured Drops
              </p>
              <div className="space-y-1">
                {CURATIONS.map((c) => {
                  const Icon = c.icon;
                  return (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground/90 hover:bg-white/[0.04] hover:text-gold transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`h-4 w-4 shrink-0 ${c.color}`} />
                        <span>{c.label}</span>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-muted/50" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Footwear Categories */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted px-2 mb-2">
                Footwear Categories
              </p>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={onClose}
                    className="flex flex-col rounded-lg px-3 py-2 text-xs text-foreground/90 hover:bg-white/[0.04] hover:text-gold transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-white">{cat.label}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-muted/50" />
                    </div>
                    <span className="text-[11px] text-muted/70">{cat.tag}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Account Links if Logged In */}
            {hydrated && isLoggedIn && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gold/80 px-2 mb-2">
                  My Account
                </p>
                <div className="space-y-1">
                  <Link
                    href="/account"
                    onClick={onClose}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground/90 hover:bg-white/[0.04] hover:text-gold transition-colors"
                  >
                    <User className="h-4 w-4 text-gold shrink-0" />
                    Profile Details
                  </Link>
                  <Link
                    href="/orders"
                    onClick={onClose}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground/90 hover:bg-white/[0.04] hover:text-gold transition-colors"
                  >
                    <Package className="h-4 w-4 text-gold shrink-0" />
                    My Orders
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={onClose}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground/90 hover:bg-white/[0.04] hover:text-gold transition-colors"
                  >
                    <Heart className="h-4 w-4 text-gold shrink-0" />
                    Saved Wishlist
                  </Link>
                  <Link
                    href="/account?tab=addresses"
                    onClick={onClose}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground/90 hover:bg-white/[0.04] hover:text-gold transition-colors"
                  >
                    <MapPin className="h-4 w-4 text-gold shrink-0" />
                    Saved Addresses
                  </Link>
                </div>
              </div>
            )}

            {/* Concierge & Support Links */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted px-2 mb-2">
                Concierge &amp; Help
              </p>
              <div className="space-y-1">
                {HELP_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-muted hover:bg-white/[0.04] hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 text-gold/80 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="h-3 w-3 text-muted/40" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="border-t border-white/10 p-4 bg-white/[0.02]">
            {hydrated && isLoggedIn ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 py-2.5 text-xs font-medium text-red-400 hover:bg-red-500/20 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            ) : (
              <div className="text-center">
                <p className="text-[11px] text-muted">
                  Bespoke Craftsmanship • PAN-India Delivery
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
