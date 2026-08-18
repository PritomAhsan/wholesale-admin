import { Metadata } from "next";

import EditDealManager from "@/features/deals/EditDealManager";

export const metadata: Metadata = {
  title: "Edit Deal",
};

interface Props {
  params: Promise<{
    uuid: string;
  }>;
}

export default async function EditDealPage({ params }: Props) {
  const { uuid } = await params;

  return <EditDealManager uuid={uuid} />;
}
