"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { isValidOtp, useAuthStore } from "@/store/auth";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function LoginModal({ open, onClose, onSuccess }: Props) {
  const requestOtpApi = useAuthStore((s) => s.requestOtp);
  const verifyOtpApi = useAuthStore((s) => s.verifyOtp);
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) {
      setStep("phone");
      setPhone("");
      setOtp("");
      setError("");
    }
  }, [open]);

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

  if (!open || !mounted) return null;

  async function requestOtp(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length !== 10) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    setSending(true);
    await requestOtpApi(cleaned);
    setSending(false);
    setStep("otp");
  }

  function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = phone.replace(/\D/g, "");
    if (!isValidOtp(otp)) {
      setError("Enter the 6-digit OTP (demo: 123456)");
      return;
    }
    const result = verifyOtpApi(cleaned, otp.trim());
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onSuccess?.();
    onClose();
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md border border-white/10 bg-background-secondary shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 text-muted hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="border-b border-white/10 bg-gold/10 px-6 py-5 pr-12">
          <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
            Login
          </p>
          <h2 id="login-title" className="mt-1 font-heading text-2xl text-white">
            {step === "phone" ? "Enter mobile number" : "Enter OTP"}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {step === "phone"
              ? "We'll send a one-time password to verify you."
              : `OTP sent to +91 ${phone.replace(/\D/g, "")} (demo OTP: 123456)`}
          </p>
        </div>

        {step === "phone" ? (
          <form onSubmit={requestOtp} className="space-y-4 px-6 py-6">
            <label className="block text-sm text-muted">
              Mobile number
              <div className="mt-2 flex border border-white/15 focus-within:border-gold">
                <span className="flex items-center border-r border-white/15 px-3 text-sm text-muted">
                  +91
                </span>
                <input
                  inputMode="numeric"
                  autoFocus
                  maxLength={10}
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="10-digit number"
                  className="w-full bg-transparent px-3 py-3 text-foreground outline-none"
                />
              </div>
            </label>
            {error && <p className="text-sm text-gold">{error}</p>}
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full bg-gold px-8 py-3 font-medium text-background transition-colors hover:bg-gold-accent disabled:opacity-50"
            >
              {sending ? "Sending…" : "Continue"}
            </button>
            <p className="text-center text-xs text-muted">
              By continuing, you agree to LMB-One Shoes Terms & Privacy.
            </p>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4 px-6 py-6">
            <label className="block text-sm text-muted">
              One-time password
              <input
                inputMode="numeric"
                autoFocus
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="6-digit OTP"
                className="mt-2 w-full border border-white/15 bg-transparent px-3 py-3 tracking-[0.35em] outline-none focus:border-gold"
              />
            </label>
            {error && <p className="text-sm text-gold">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-full bg-gold px-8 py-3 font-medium text-background transition-colors hover:bg-gold-accent"
            >
              Verify & login
            </button>
            <button
              type="button"
              className="w-full text-center text-sm text-muted hover:text-gold"
              onClick={() => {
                setStep("phone");
                setOtp("");
                setError("");
              }}
            >
              Change number
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
