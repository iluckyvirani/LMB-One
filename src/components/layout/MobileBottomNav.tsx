"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, LayoutGrid, Heart, ShoppingBag, User } from "lucide-react";
import { useCartStore, cartCount } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useAuthStore } from "@/store/auth";
import { useHasHydrated } from "@/lib/useHasHydrated";
import { LoginModal } from "@/components/LoginModal";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const hydrated = useHasHydrated();
  const cartItems = useCartStore((s) => s.items);
  const wishlistItems = useWishlistStore((s) => s.items);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const [loginOpen, setLoginOpen] = useState(false);

  const count = hydrated ? cartCount(cartItems) : 0;
  const wishCount = hydrated ? wishlistItems.length : 0;

  function handleAccountClick() {
    if (isLoggedIn) {
      router.push("/account");
    } else {
      setLoginOpen(true);
    }
  }

  const isHome = pathname === "/";
  const isShop = pathname.startsWith("/shop");
  const isWishlist = pathname === "/wishlist";
  const isBag = pathname === "/cart";
  const isAccount = pathname.startsWith("/account") || pathname.startsWith("/orders");

  return (
    <>
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl md:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.85)] select-none"
      >
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2 pb-[max(env(safe-area-inset-bottom),0px)]">
          {/* Home */}
          <Link
            href="/"
            className={cn(
              "group relative flex flex-1 flex-col items-center justify-center py-1 transition-transform active:scale-90",
              isHome ? "text-gold" : "text-muted/70 hover:text-foreground"
            )}
          >
            {isHome && (
              <span className="absolute -top-2.5 h-[2.5px] w-8 rounded-full bg-gold shadow-[0_0_10px_rgba(201,162,39,0.9)]" />
            )}
            <Home
              className={cn(
                "h-5 w-5 transition-transform",
                isHome ? "scale-110 text-gold stroke-[2.2]" : "text-muted/80 stroke-[1.8]"
              )}
            />
            <span
              className={cn(
                "mt-1 text-[10px] tracking-wide",
                isHome ? "font-semibold text-gold" : "font-normal"
              )}
            >
              Home
            </span>
          </Link>

          {/* Categories */}
          <Link
            href="/shop"
            aria-label="Categories"
            className={cn(
              "group relative flex flex-1 flex-col items-center justify-center py-1 transition-transform active:scale-90",
              isShop ? "text-gold" : "text-muted/70 hover:text-foreground"
            )}
          >
            {isShop && (
              <span className="absolute -top-2.5 h-[2.5px] w-8 rounded-full bg-gold shadow-[0_0_10px_rgba(201,162,39,0.9)]" />
            )}
            <LayoutGrid
              className={cn(
                "h-5 w-5 transition-transform",
                isShop ? "scale-110 text-gold stroke-[2.2]" : "text-muted/80 stroke-[1.8]"
              )}
            />
            <span
              className={cn(
                "mt-1 text-[10px] tracking-wide",
                isShop ? "font-semibold text-gold" : "font-normal"
              )}
            >
              Categories
            </span>
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className={cn(
              "group relative flex flex-1 flex-col items-center justify-center py-1 transition-transform active:scale-90",
              isWishlist ? "text-gold" : "text-muted/70 hover:text-foreground"
            )}
          >
            {isWishlist && (
              <span className="absolute -top-2.5 h-[2.5px] w-8 rounded-full bg-gold shadow-[0_0_10px_rgba(201,162,39,0.9)]" />
            )}
            <div className="relative">
              <Heart
                className={cn(
                  "h-5 w-5 transition-transform",
                  isWishlist
                    ? "scale-110 text-gold fill-gold/20 stroke-[2.2]"
                    : "text-muted/80 stroke-[1.8]"
                )}
              />
              {wishCount > 0 && (
                <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gold px-1 font-[family-name:var(--font-poppins)] text-[9px] font-bold text-background shadow-md">
                  {wishCount}
                </span>
              )}
            </div>
            <span
              className={cn(
                "mt-1 text-[10px] tracking-wide",
                isWishlist ? "font-semibold text-gold" : "font-normal"
              )}
            >
              Wishlist
            </span>
          </Link>

          {/* Bag / Cart */}
          <Link
            href="/cart"
            aria-label="Shopping Bag"
            className={cn(
              "group relative flex flex-1 flex-col items-center justify-center py-1 transition-transform active:scale-90",
              isBag ? "text-gold" : "text-muted/70 hover:text-foreground"
            )}
          >
            {isBag && (
              <span className="absolute -top-2.5 h-[2.5px] w-8 rounded-full bg-gold shadow-[0_0_10px_rgba(201,162,39,0.9)]" />
            )}
            <div className="relative">
              <ShoppingBag
                className={cn(
                  "h-5 w-5 transition-transform",
                  isBag ? "scale-110 text-gold stroke-[2.2]" : "text-muted/80 stroke-[1.8]"
                )}
              />
              {count > 0 && (
                <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gold px-1 font-[family-name:var(--font-poppins)] text-[9px] font-bold text-background shadow-md">
                  {count}
                </span>
              )}
            </div>
            <span
              className={cn(
                "mt-1 text-[10px] tracking-wide",
                isBag ? "font-semibold text-gold" : "font-normal"
              )}
            >
              Bag
            </span>
          </Link>

          {/* Account */}
          <button
            type="button"
            onClick={handleAccountClick}
            aria-label="My Account"
            className={cn(
              "group relative flex flex-1 flex-col items-center justify-center py-1 transition-transform active:scale-90",
              isAccount ? "text-gold" : "text-muted/70 hover:text-foreground"
            )}
          >
            {isAccount && (
              <span className="absolute -top-2.5 h-[2.5px] w-8 rounded-full bg-gold shadow-[0_0_10px_rgba(201,162,39,0.9)]" />
            )}
            <User
              className={cn(
                "h-5 w-5 transition-transform",
                isAccount ? "scale-110 text-gold stroke-[2.2]" : "text-muted/80 stroke-[1.8]"
              )}
            />
            <span
              className={cn(
                "mt-1 text-[10px] tracking-wide",
                isAccount ? "font-semibold text-gold" : "font-normal"
              )}
            >
              {isLoggedIn ? "Account" : "Login"}
            </span>
          </button>
        </div>
      </nav>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
