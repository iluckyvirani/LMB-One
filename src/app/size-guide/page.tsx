import type { Metadata } from "next";
import Link from "next/link";
import { footLengthCm } from "@/lib/productDetails";

export const metadata: Metadata = {
  title: "Size Guide & Fit Chart",
  description: "Find your ideal shoe size with the LMB Shoes comprehensive UK, US, EU, and CM fit guide.",
};

const SIZES = [
  { uk: 5, usMen: 6, usWomen: 7, eu: 38, cm: 24.1 },
  { uk: 6, usMen: 7, usWomen: 8, eu: 39.5, cm: 25.0 },
  { uk: 7, usMen: 8, usWomen: 9, eu: 40.5, cm: 25.8 },
  { uk: 8, usMen: 9, usWomen: 10, eu: 42, cm: 26.7 },
  { uk: 9, usMen: 10, usWomen: 11, eu: 43, cm: 27.5 },
  { uk: 10, usMen: 11, usWomen: 12, eu: 44.5, cm: 28.4 },
  { uk: 11, usMen: 12, usWomen: 13, eu: 46, cm: 29.2 },
  { uk: 12, usMen: 13, usWomen: 14, eu: 47, cm: 30.1 },
];

export default function SizeGuidePage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <nav className="mb-6 text-xs text-muted">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground/80">Size Guide</span>
      </nav>

      <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
        Footwear Size Guide
      </h1>
      <p className="mt-2 text-sm text-muted">
        All LMB Shoes follow standard <strong>UK / Indian sizing</strong>. Use this conversion chart to determine your best fit.
      </p>

      <div className="mt-8 overflow-x-auto border border-white/10 bg-white/[0.02]">
        <table className="w-full min-w-[500px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.04] text-xs uppercase tracking-wider text-gold">
              <th className="px-4 py-3 font-semibold">UK / India Size</th>
              <th className="px-4 py-3 font-semibold">US Men</th>
              <th className="px-4 py-3 font-semibold">US Women</th>
              <th className="px-4 py-3 font-semibold">EU Size</th>
              <th className="px-4 py-3 font-semibold">Foot Length (cm)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-muted">
            {SIZES.map((row) => (
              <tr key={row.uk} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-medium text-white">{row.uk}</td>
                <td className="px-4 py-3">{row.usMen}</td>
                <td className="px-4 py-3">{row.usWomen}</td>
                <td className="px-4 py-3">{row.eu}</td>
                <td className="px-4 py-3 text-gold">{row.cm} cm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 space-y-6">
        <h2 className="font-heading text-xl text-foreground">How to Measure Your Foot at Home</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="border border-white/10 bg-white/[0.02] p-5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 text-xs font-semibold text-gold">1</span>
            <p className="mt-3 font-medium text-white">Place Foot on Paper</p>
            <p className="mt-1 text-xs text-muted">
              Stand upright on a sheet of paper against a flat wall, wearing the socks you intend to wear.
            </p>
          </div>
          <div className="border border-white/10 bg-white/[0.02] p-5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 text-xs font-semibold text-gold">2</span>
            <p className="mt-3 font-medium text-white">Mark Longest Toe</p>
            <p className="mt-1 text-xs text-muted">
              Use a pencil held perpendicular to mark the outermost edge of your heel and the tip of your longest toe.
            </p>
          </div>
          <div className="border border-white/10 bg-white/[0.02] p-5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 text-xs font-semibold text-gold">3</span>
            <p className="mt-3 font-medium text-white">Measure Distance in CM</p>
            <p className="mt-1 text-xs text-muted">
              Measure the distance between the two lines with a ruler and cross-reference with the chart above.
            </p>
          </div>
        </div>

        <div className="mt-6 border border-white/10 bg-white/[0.02] p-5 text-xs text-muted">
          <p className="font-semibold text-white">Fit Tips from LMB Master Shoemakers:</p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li><strong>Between sizes?</strong> If your foot length falls between two sizes, we recommend selecting the larger size.</li>
            <li><strong>Wide feet?</strong> For broad feet in formal Oxfords or Chelsea boots, go one UK size up for extra toe box breathing room.</li>
            <li><strong>Still unsure?</strong> Remember we offer a <Link href="/returns-refunds" className="text-gold underline">7-Day Free Size Exchange</Link> on all unworn pairs.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

