import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="mb-6 font-heading text-3xl text-foreground">
        About {BRAND.storeName}
      </h1>
      <p className="text-lg text-muted">{BRAND.description}</p>
      <p className="mt-4 text-muted">
        Every pair is chosen for craftsmanship and comfort, so you can step
        into whatever the day brings with confidence.
      </p>
    </div>
  );
}
