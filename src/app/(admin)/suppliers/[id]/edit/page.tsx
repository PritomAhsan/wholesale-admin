import { Metadata } from "next";

import EditSupplierManager from "@/features/suppliers/EditSupplierManager";

export const metadata: Metadata = {
  title: "Edit Supplier",
};

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditSupplierPage({ params }: Props) {
  const { id } = await params;

  return <EditSupplierManager uuid={id} />;
}
