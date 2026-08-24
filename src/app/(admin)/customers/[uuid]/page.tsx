import { Metadata } from "next";

import CustomerDetail from "@/features/customers/CustomerDetail";

export const metadata: Metadata = {
  title: "Customer Details",
};

interface Props {
  params: Promise<{ uuid: string }>;
}

export default async function CustomerDetailPage({ params }: Props) {
  const { uuid } = await params;

  return <CustomerDetail uuid={uuid} />;
}
