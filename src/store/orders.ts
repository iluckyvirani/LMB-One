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

export type ShipmentInfo = {
  courier?: string;
  awbCode?: string;
  status: string;
  lastUpdate: string;
};

export type Order = {
  id: string;
  createdAt: string;
  status: "ordered" | "packed" | "shipped" | "out_for_delivery" | "delivered" | "cancelled" | string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discountAmount?: number;
  couponCode?: string | null;
  total: number;
  address: UserAddress;
  paymentMethod: string;
  shipment?: ShipmentInfo | null;
};

type ServerOrder = {
  id: string;
  createdAt: string;
  status: string;
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
  discountAmount?: number;
  couponCode?: string | null;
  total: number;
  shipment?: ShipmentInfo | null;
};

export function mapServerOrder(o: ServerOrder): Order {
  return {
    id: o.id,
    createdAt: o.createdAt,
    status: o.status || "ordered",
    items: (o.items ?? []).map((i) => ({
      productId: i.productId,
      slug: i.slug,
      title: i.title,
      price: Number(i.price),
      qty: i.qty,
      size: i.size,
      swatch: i.swatch ?? ["#1a1a1a", "#3a3a3a"],
      image: i.image,
    })),
    subtotal: Number(o.subtotal),
    shipping: Number(o.shipping),
    discountAmount: Number(o.discountAmount ?? 0),
    couponCode: o.couponCode ?? null,
    total: Number(o.total),
    paymentMethod: o.paymentMethod,
    shipment: o.shipment ?? null,
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
  fetchOrderById: (id: string) => Promise<Order>;
  placeOrder: (
    items: CartItem[],
    address: UserAddress,
    paymentMethod: string,
    couponCode?: string,
  ) => Promise<Order>;
  cancelOrder: (orderId: string) => Promise<Order>;
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      fetchOrders: async () => {
        try {
          const orders = await api.get<ServerOrder[]>("/customer/orders");
          set({ orders: orders.map(mapServerOrder) });
        } catch (err) {
          console.error("fetchOrders error:", err);
        }
      },

      fetchOrderById: async (id: string) => {
        try {
          // Try customer order first
          const serverOrder = await api.get<ServerOrder>(`/customer/orders/${encodeURIComponent(id)}`);
          const order = mapServerOrder(serverOrder);
          const current = get().orders;
          const idx = current.findIndex((o) => o.id === order.id);
          set({
            orders: idx >= 0 ? current.map((o, i) => (i === idx ? order : o)) : [order, ...current],
          });
          return order;
        } catch {
          // Try public track endpoint fallback (works for guest orders too!)
          const publicOrder = await api.get<ServerOrder>(`/orders/track?id=${encodeURIComponent(id)}`);
          const order = mapServerOrder(publicOrder);
          const current = get().orders;
          const idx = current.findIndex((o) => o.id === order.id);
          set({
            orders: idx >= 0 ? current.map((o, i) => (i === idx ? order : o)) : [order, ...current],
          });
          return order;
        }
      },

      placeOrder: async (cartItems, address, paymentMethod, couponCode) => {
        const payload = {
          items: cartItems.map((i) => ({
            productId: i.product.id,
            size: i.size,
            qty: i.qty,
          })),
          address,
          paymentMethod,
          couponCode: couponCode || undefined,
        };
        const created = await api.post<ServerOrder>("/orders", payload);
        const order = mapServerOrder(created);
        set({ orders: [order, ...get().orders] });
        return order;
      },

      cancelOrder: async (orderId: string) => {
        const updated = await api.post<ServerOrder>(`/customer/orders/${orderId}/cancel`);
        const order = mapServerOrder(updated);
        set({
          orders: get().orders.map((o) => (o.id === orderId ? order : o)),
        });
        return order;
      },
    }),
    { name: "lmb-shoes-orders" },
  ),
);

export const ORDER_FLOW = [
  { status: "ordered", label: "Order Confirmed" },
  { status: "packed", label: "Packed" },
  { status: "shipped", label: "Shipped" },
  { status: "out_for_delivery", label: "Out for Delivery" },
  { status: "delivered", label: "Delivered" },
] as const;

export function getOrderTimeline(order: Order) {
  if (order.status === "cancelled") {
    return [
      { status: "ordered", label: "Order Placed", done: true, isCancelled: false },
      { status: "cancelled", label: "Cancelled", done: true, isCancelled: true },
    ];
  }

  const flowStatuses = ORDER_FLOW.map((s) => s.status as string);
  const currentIndex = flowStatuses.indexOf(order.status);
  const activeIdx = currentIndex >= 0 ? currentIndex : 0;

  return ORDER_FLOW.map((step, idx) => ({
    status: step.status,
    label: step.label,
    done: idx <= activeIdx,
    isCurrent: idx === activeIdx,
    isCancelled: false,
  }));
}

export function getOrderStatusLabel(order: Order) {
  if (order.status === "cancelled") return "Cancelled";
  const found = ORDER_FLOW.find((s) => s.status === order.status);
  return found?.label ?? "Order Confirmed";
}
