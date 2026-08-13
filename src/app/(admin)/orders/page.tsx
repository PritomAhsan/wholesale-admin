import { Metadata } from "next";

import OrderManager from "@/features/orders/OrderManager";

export const metadata: Metadata = {
  title: "Orders",
};

export default function OrdersPage() {
  return <OrderManager />;
}
