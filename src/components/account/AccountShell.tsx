"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Package, Heart, MapPin, LogOut, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { useHasHydrated } from "@/lib/useHasHydrated";
import { LoginModal } from "@/components/LoginModal";

export type AccountTab = "profile" | "addresses" | "orders" | "wishlist";

const NAV: { id: AccountTab; href: string; label: string; Icon: typeof User }[] = [
  { id: "profile", href: "/account", label: "Profile Information", Icon: User },
  { id: "addresses", href: "/account?tab=addresses", label: "Manage Addresses", Icon: MapPin },
  { id: "orders", href: "/orders", label: "My Orders", Icon: Package },
  { id: "wishlist", href: "/wishlist", label: "Wishlist", Icon: Heart },
];

export function AccountShell({
  activeTab,
  breadcrumbLabel,
  children,
}: {
  activeTab: AccountTab;
  breadcrumbLabel: string;
  children: React.ReactNode;
}) {
  const hydrated = useHasHydrated();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const name = useAuthStore((s) => s.name);
  const logout = useAuthStore((s) => s.logout);
  const [loginOpen, setLoginOpen] = useState(false);

  if (!hydrated) return null;

  if (!isLoggedIn) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
        <h1 className="font-heading text-2xl text-foreground">Login to continue</h1>
        <p className="text-muted">
          Track orders, manage your wishlist and saved addresses.
        </p>
        <button
          type="button"
          onClick={() => setLoginOpen(true)}
          className="rounded-full bg-gold px-8 py-3 font-medium text-background transition-colors hover:bg-gold-accent"
        >
          Login
        </button>
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-xs text-muted">
        <Link href="/" className="hover:text-gold">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/account" className="hover:text-gold">
          My Account
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground/80">{breadcrumbLabel}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
              <User className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs text-muted">Hello,</p>
              <p className="font-heading text-lg text-white">{name || "Customer"}</p>
            </div>
          </div>

          <nav className="mt-4 space-y-1">
            {NAV.map(({ id, href, label, Icon }) => {
              const active = id === activeTab;
              return (
                <Link
                  key={id}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-gold/10 text-gold"
                      : "text-muted hover:bg-white/[0.04] hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      active ? "text-gold" : "text-muted",
                    )}
                  />
                  <span className="flex-1">{label}</span>
                  <ChevronRight
                    className={cn(
                      "h-3.5 w-3.5",
                      active ? "text-gold/70" : "text-muted/40",
                    )}
                  />
                </Link>
              );
            })}
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-muted hover:bg-white/[0.04] hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </nav>
        </aside>

        <div className="min-w-0 border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
