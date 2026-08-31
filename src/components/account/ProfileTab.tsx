"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";

export function ProfileTab() {
  const phone = useAuthStore((s) => s.phone);
  const name = useAuthStore((s) => s.name);
  const profile = useAuthStore((s) => s.profile);
  const updateProfile = useAuthStore((s) => s.updateProfile);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [editing, setEditing] = useState<"profile" | "email" | "phone" | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFirstName(profile?.firstName ?? name?.split(/\s+/)[0] ?? "");
    setLastName(profile?.lastName ?? name?.split(/\s+/).slice(1).join(" ") ?? "");
    setEmail(profile?.email ?? "");
    setMobile(phone ?? "");
  }, [profile, name, phone]);

  const inputClass =
    "w-full border border-white/15 bg-background px-3 py-2.5 text-sm outline-none focus:border-gold disabled:opacity-60";

  async function saveProfile() {
    setSaving(true);
    setError("");
    try {
      await updateProfile({
        firstName: firstName.trim() || "LMB",
        lastName: lastName.trim(),
        email: email.trim(),
        phone: mobile.replace(/\D/g, "").slice(0, 10) || phone || undefined,
      });
      setEditing(null);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Could not save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="font-heading text-3xl text-white">Profile Information</h1>
      {saved && <p className="mt-3 text-sm text-gold">Profile saved successfully.</p>}
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <section className="mt-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm tracking-widest text-gold uppercase">
            Personal Information
          </h2>
          <button
            type="button"
            className="text-sm text-gold hover:text-gold-accent"
            onClick={() => setEditing(editing === "profile" ? null : "profile")}
          >
            {editing === "profile" ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            disabled={editing !== "profile"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
            placeholder="First name"
          />
          <input
            disabled={editing !== "profile"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={inputClass}
            placeholder="Last name"
          />
        </div>
        {editing === "profile" && (
          <button
            type="button"
            disabled={saving}
            onClick={saveProfile}
            className="mt-4 rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-background hover:bg-gold-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        )}
      </section>

      <section className="mt-10 border-t border-white/10 pt-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm tracking-widest text-gold uppercase">
            Email Address
          </h2>
          <button
            type="button"
            className="text-sm text-gold hover:text-gold-accent"
            onClick={() => setEditing(editing === "email" ? null : "email")}
          >
            {editing === "email" ? "Cancel" : "Edit"}
          </button>
        </div>
        <input
          disabled={editing !== "email"}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`mt-4 ${inputClass} max-w-md`}
          placeholder="you@email.com"
        />
        {editing === "email" && (
          <button
            type="button"
            disabled={saving}
            onClick={saveProfile}
            className="mt-4 rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-background hover:bg-gold-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        )}
      </section>

      <section className="mt-10 border-t border-white/10 pt-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm tracking-widest text-gold uppercase">
            Mobile Number
          </h2>
          <button
            type="button"
            className="text-sm text-gold hover:text-gold-accent"
            onClick={() => setEditing(editing === "phone" ? null : "phone")}
          >
            {editing === "phone" ? "Cancel" : "Edit"}
          </button>
        </div>
        <input
          disabled={editing !== "phone"}
          value={mobile}
          onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
          className={`mt-4 ${inputClass} max-w-md`}
          placeholder="10-digit mobile"
        />
        {editing === "phone" && (
          <button
            type="button"
            disabled={saving}
            onClick={saveProfile}
            className="mt-4 rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-background hover:bg-gold-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        )}
      </section>
    </div>
  );
}
