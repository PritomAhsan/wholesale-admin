import { Metadata } from "next";

import OrderDetail from "@/features/orders/OrderDetail";

export const metadata: Metadata = {
  title: "Order Details",
};

interface Props {
  params: Promise<{ uuid: string }>;
}

export default async function OrderDetailPage({ params }: Props) {
  const { uuid } = await params;

  return <OrderDetail uuid={uuid} />;
}
