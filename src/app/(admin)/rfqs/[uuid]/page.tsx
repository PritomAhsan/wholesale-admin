import { Metadata } from "next";

import RfqDetail from "@/features/rfqs/RfqDetail";

export const metadata: Metadata = {
  title: "RFQ Details",
};

interface Props {
  params: Promise<{ uuid: string }>;
}

export default async function RfqDetailPage({ params }: Props) {
  const { uuid } = await params;

  return <RfqDetail uuid={uuid} />;
}
