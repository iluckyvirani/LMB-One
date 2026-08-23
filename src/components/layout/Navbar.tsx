"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Search,
  ShoppingBag,
  User,
  Package,
  Heart,
  MapPin,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCartStore, cartCount } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { shortDisplayName, useAuthStore } from "@/store/auth";
import { useHasHydrated } from "@/lib/useHasHydrated";
import { LoginModal } from "@/components/LoginModal";

const ACCOUNT_ITEMS = [
  { href: "/account", label: "My Profile", Icon: User },
  { href: "/account?tab=addresses", label: "Manage Addresses", Icon: MapPin },
  { href: "/orders", label: "My Orders", Icon: Package },
  { href: "/wishlist", label: "Wishlist", Icon: Heart },
] as const;

const menuItemClass =
  "flex items-center gap-3 border-b border-white/10 px-4 py-3 text-sm text-foreground/90 last:border-b-0 hover:bg-white/[0.04] hover:text-gold";

function AccountDropdown({
  open,
  onOpen,
  onClose,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const phone = useAuthStore((s) => s.phone);
  const name = useAuthStore((s) => s.name);
  const logout = useAuthStore((s) => s.logout);
  const accountLabel = shortDisplayName(name, phone);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, onClose]);

  if (!isLoggedIn) {
    return (
      <>
        <button
          type="button"
          onClick={() => setLoginOpen(true)}
          className="rounded-full bg-gold px-5 py-1.5 text-sm font-medium text-background hover:bg-gold-accent"
        >
          Login
        </button>
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      </>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        className="flex items-center gap-1.5 text-sm text-foreground/90 hover:text-gold"
        onClick={() => (open ? onClose() : onOpen())}
      >
        <User className="h-4 w-4 text-gold" />
        {accountLabel}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 opacity-70 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 pt-3">
          <div className="relative min-w-[240px] border border-white/10 bg-background-secondary py-1 shadow-[0_8px_24px_rgba(0,0,0,0.55)]">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-2 right-10 h-3.5 w-3.5 rotate-45 border-l border-t border-white/10 bg-background-secondary"
            />
            <div className="border-b border-white/10 px-4 py-3">
              <p className="text-xs text-muted">Your account</p>
              <p className="mt-0.5 font-heading text-base text-white">
                {name || accountLabel}
              </p>
            </div>
            {ACCOUNT_ITEMS.map(({ href, label, Icon }) => (
              <Link
                key={label}
                href={href}
                className={menuItemClass}
                onClick={onClose}
              >
                <Icon className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
                {label}
              </Link>
            ))}
            <button
              type="button"
              className={menuItemClass}
              onClick={() => {
                logout();
                onClose();
              }}
            >
              <LogOut className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [query, setQuery] = useState("");
  const hydrated = useHasHydrated();

  const cartItems = useCartStore((s) => s.items);
  const wishlistItems = useWishlistStore((s) => s.items);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const logout = useAuthStore((s) => s.logout);
  const count = hydrated ? cartCount(cartItems) : 0;
  const wishCount = hydrated ? wishlistItems.length : 0;

  useEffect(() => {
    setMobileOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/logo.jpg"
            alt={`${BRAND.storeName} logo`}
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-heading text-lg tracking-tight text-foreground">
            {BRAND.storeName}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={onSearch} className="hidden min-w-0 flex-1 md:block">
          <label className="relative mx-auto block max-w-md">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for shoes, styles and more"
              className="w-full border border-white/10 bg-white/[0.06] py-2.5 pl-4 pr-11 text-sm text-foreground outline-none placeholder:text-muted/70 focus:border-gold/50"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gold hover:text-gold-accent"
            >
              <Search className="h-4 w-4" />
            </button>
          </label>
        </form>

        <div className="ml-auto hidden items-center gap-6 lg:flex">
          <AccountDropdown
            open={accountOpen}
            onOpen={() => setAccountOpen(true)}
            onClose={() => setAccountOpen(false)}
          />

          <Link
            href="/wishlist"
            className="relative flex items-center gap-1.5 text-sm text-foreground/90 hover:text-gold"
          >
            <Heart className="h-4 w-4 text-gold" />
            Wishlist
            {wishCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 font-[family-name:var(--font-poppins)] text-[10px] text-background">
                {wishCount}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center gap-1.5 text-sm text-foreground/90 hover:text-gold"
          >
            <ShoppingBag className="h-4 w-4" />
            Cart
            {count > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 font-[family-name:var(--font-poppins)] text-[10px] text-background">
                {count}
              </span>
            )}
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center text-foreground"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] text-background">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-background/98 backdrop-blur-xl lg:hidden">
          <form onSubmit={onSearch} className="border-b border-white/10 px-4 py-3">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for shoes"
                className="w-full border border-white/10 bg-white/[0.04] py-2.5 pl-3 pr-10 text-sm outline-none focus:border-gold/50"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gold"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
          <div className="flex flex-col px-2 py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-3 py-3 text-sm hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 border-t border-white/10" />
            {hydrated && isLoggedIn ? (
              <>
                {ACCOUNT_ITEMS.map(({ href, label, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-3 px-3 py-3 text-sm hover:text-gold"
                  >
                    <Icon className="h-4 w-4 text-gold" /> {label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={logout}
                  className="flex items-center gap-3 px-3 py-3 text-left text-sm hover:text-gold"
                >
                  <LogOut className="h-4 w-4 text-gold" /> Logout
                </button>
              </>
            ) : (
              <MobileLoginTrigger />
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function MobileLoginTrigger() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 px-3 py-3 text-left text-sm hover:text-gold"
      >
        <User className="h-4 w-4 text-gold" /> Login
      </button>
      <LoginModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
