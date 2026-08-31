import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-20 sm:px-6">
      <h1 className="mb-6 font-heading text-3xl text-foreground">
        Contact {BRAND.storeName}
      </h1>
      <p className="mb-8 text-muted">
        Questions about an order or a pair of shoes? Reach out below.
      </p>
      <ContactForm />
    </div>
  );
}
