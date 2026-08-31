import { api } from "@/lib/api";

export type Banner = {
  id: number;
  href: string;
  image: string | null;
  swatch: [string, string];
  badge: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
};

export type Testimonial = {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
};

export type TrustItem = {
  id: number;
  icon: string;
  label: string;
  description: string;
};

export type BankOffer = {
  id: number;
  title: string;
  detail: string;
};

export const fetchBanners = () => api.get<Banner[]>("/banners");
export const fetchTestimonials = () => api.get<Testimonial[]>("/testimonials");
export const fetchTrustItems = () => api.get<TrustItem[]>("/trust-items");
export const fetchBankOffers = () => api.get<BankOffer[]>("/bank-offers");
