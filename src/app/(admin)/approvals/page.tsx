import { Metadata } from "next";

import ApprovalDashboard from "@/features/approvals/ApprovalDashboard";

export const metadata: Metadata = {
  title: "Product Approvals",
};

export default function ApprovalsPage() {
  return <ApprovalDashboard />;
}
