import type { Metadata } from "next";
import { OrderTrack } from "@/components/OrdersView";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ success?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: id };
}

export default async function OrderDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { success } = await searchParams;
  return <OrderTrack orderId={id} success={success === "1"} />;
}
