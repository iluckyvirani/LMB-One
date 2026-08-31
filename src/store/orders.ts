"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserAddress } from "@/store/auth";
import type { CartItem } from "@/store/cart";
import { api } from "@/lib/api";

export type OrderItem = {
  productId: string;
  slug: string;
  title: string;
  price: number;
  qty: number;
  size: number;
  swatch: [string, string];
  image?: string;
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

type ServerOrder = {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: string;
  items: {
    productId: string;
    slug: string;
    title: string;
    price: number;
    qty: number;
    size: number;
    swatch: [string, string];
    image?: string;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
};

function mapServerOrder(o: ServerOrder): Order {
  return {
    id: o.id,
    createdAt: o.createdAt,
    items: o.items.map((i) => ({
      productId: i.productId,
      slug: i.slug,
      title: i.title,
      price: i.price,
      qty: i.qty,
      size: i.size,
      swatch: i.swatch,
      image: i.image,
    })),
    subtotal: o.subtotal,
    shipping: o.shipping,
    total: o.total,
    paymentMethod: o.paymentMethod,
    address: {
      fullName: o.customerName,
      phone: o.customerPhone,
      addressLine1: o.address,
      city: o.city,
      state: o.state,
      pincode: o.pincode,
      label: "Home",
    },
  };
}

type OrderState = {
  orders: Order[];
  fetchOrders: () => Promise<void>;
  placeOrder: (
    items: CartItem[],
    address: UserAddress,
    paymentMethod: string,
  ) => Promise<Order>;
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      fetchOrders: async () => {
        const orders = await api.get<ServerOrder[]>("/customer/orders");
        set({ orders: orders.map(mapServerOrder) });
      },

      placeOrder: async (cartItems, address, paymentMethod) => {
        const payload = {
          items: cartItems.map((i) => ({
            productId: i.product.id,
            size: i.size,
            qty: i.qty,
          })),
          address,
          paymentMethod,
        };
        const created = await api.post<ServerOrder>("/orders", payload);
        const order = mapServerOrder(created);
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
