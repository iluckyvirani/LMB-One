import { Suspense } from "react";
import type { Metadata } from "next";
import { AccountPageContent } from "@/components/account/AccountPageContent";

export const metadata: Metadata = { title: "My Account" };

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="px-6 py-24 text-center text-muted">Loading account…</div>
      }
    >
      <AccountPageContent />
    </Suspense>
  );
}
