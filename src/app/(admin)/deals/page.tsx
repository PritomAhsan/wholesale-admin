import { Metadata } from "next";

import DealsManager from "@/features/deals/DealsManager";

export const metadata: Metadata = {
  title: "Deals",
};

export default function DealsPage() {
  return <DealsManager />;
}
