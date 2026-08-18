import { Metadata } from "next";

import PayoutsRouter from "@/features/payouts/PayoutsRouter";

export const metadata: Metadata = {
  title: "Payouts",
};

export default function PayoutsPage() {
  return <PayoutsRouter />;
}
