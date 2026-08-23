"use client";

import { useSearchParams } from "next/navigation";
import { AccountShell } from "@/components/account/AccountShell";
import { ProfileTab } from "@/components/account/ProfileTab";
import { AddressesTab } from "@/components/account/AddressesTab";

export function AccountPageContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") === "addresses" ? "addresses" : "profile";

  return (
    <AccountShell
      activeTab={tab}
      breadcrumbLabel={tab === "addresses" ? "Manage Addresses" : "Profile Information"}
    >
      {tab === "addresses" ? <AddressesTab /> : <ProfileTab />}
    </AccountShell>
  );
}
