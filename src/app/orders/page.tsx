import type { Metadata } from "next";
import { OrdersList } from "@/components/OrdersView";

export const metadata: Metadata = { title: "My Orders" };

export default function OrdersPage() {
  return <OrdersList />;
}
