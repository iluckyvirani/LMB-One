import Link from "next/link";
import { Footprints } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[65vh] w-full max-w-md flex-col items-center justify-center px-4 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold mb-6">
        <Footprints className="h-8 w-8" />
      </div>
      <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium">404 Error</p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-3 text-sm text-muted">
        The pair or page you&apos;re looking for might have been stepped out, moved, or no longer exists.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full border border-gold/50 px-6 py-2.5 text-sm font-medium text-gold hover:bg-gold/10"
        >
          Return Home
        </Link>
        <Link
          href="/shop"
          className="rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-background hover:bg-gold-accent"
        >
          Explore Catalog
        </Link>
      </div>
    </div>
  );
}

