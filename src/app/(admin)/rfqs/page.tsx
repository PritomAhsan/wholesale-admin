import { Metadata } from "next";

import RfqManager from "@/features/rfqs/RfqManager";

export const metadata: Metadata = {
  title: "RFQs",
};

export default function RfqsPage() {
  return <RfqManager />;
}
