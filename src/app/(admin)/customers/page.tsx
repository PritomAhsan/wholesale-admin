import { Metadata } from "next";

import CustomersManager from "@/features/customers/CustomersManager";

export const metadata: Metadata = {
  title: "Customers",
};

export default function CustomersPage() {
  return <CustomersManager />;
}
