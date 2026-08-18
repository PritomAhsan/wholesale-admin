import { Metadata } from "next";

import DisputesManager from "@/features/disputes/DisputesManager";

export const metadata: Metadata = {
  title: "Disputes",
};

export default function DisputesPage() {
  return <DisputesManager />;
}
