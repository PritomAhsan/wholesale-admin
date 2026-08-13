import { Metadata } from "next";

import SupplierOrderDetail from "@/features/supplier-orders/SupplierOrderDetail";

export const metadata: Metadata = {
  title: "Order Details",
};

interface Props {
  params: Promise<{ uuid: string }>;
}

export default async function SupplierOrderDetailPage({ params }: Props) {
  const { uuid } = await params;

  return <SupplierOrderDetail uuid={uuid} />;
}
