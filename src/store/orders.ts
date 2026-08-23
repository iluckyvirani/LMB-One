"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserAddress } from "@/store/auth";
import type { CartItem } from "@/store/cart";

export type OrderItem = {
  productId: string;
  slug: string;
  title: string;
  price: number;
  qty: number;
  size: number;
  swatch: [string, string];
};

export type Order = {
  id: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  address: UserAddress;
  paymentMethod: string;
};

type OrderState = {
  orders: Order[];
  placeOrder: (
    items: CartItem[],
    address: UserAddress,
    paymentMethod: string,
  ) => Order;
};

function newOrderId() {
  const n = Math.floor(1_000_000 + Math.random() * 8_999_999);
  return `LMB-${n}`;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      placeOrder: (cartItems, address, paymentMethod) => {
        const items: OrderItem[] = cartItems.map((i) => ({
          productId: i.product.id,
          slug: i.product.slug,
          title: i.product.title,
          price: i.product.price,
          qty: i.qty,
          size: i.size,
          swatch: i.product.swatch,
        }));
        const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
        const shipping = 0;
        const order: Order = {
          id: newOrderId(),
          createdAt: new Date().toISOString(),
          items,
          subtotal,
          shipping,
          total: subtotal + shipping,
          address,
          paymentMethod,
        };
        set({ orders: [order, ...get().orders] });
        return order;
      },
    }),
    { name: "lmb-shoes-orders" },
  ),
);

export const TIMELINE_STEPS = [
  { status: "ordered", label: "Order Confirmed", afterMs: 0 },
  { status: "packed", label: "Packed", afterMs: 60_000 },
  { status: "shipped", label: "Shipped", afterMs: 3 * 60_000 },
  { status: "out_for_delivery", label: "Out for Delivery", afterMs: 6 * 60_000 },
  { status: "delivered", label: "Delivered", afterMs: 10 * 60_000 },
] as const;

export function getOrderTimeline(order: Order, now = Date.now()) {
  const createdAt = new Date(order.createdAt).getTime();
  const elapsed = now - createdAt;
  return TIMELINE_STEPS.map((step) => ({
    status: step.status,
    label: step.label,
    done: elapsed >= step.afterMs,
    at: elapsed >= step.afterMs ? new Date(createdAt + step.afterMs) : null,
  }));
}

export function getOrderStatusLabel(order: Order) {
  const timeline = getOrderTimeline(order);
  const done = timeline.filter((s) => s.done);
  return done[done.length - 1]?.label ?? "Order Confirmed";
}
