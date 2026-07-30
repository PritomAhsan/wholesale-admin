import type { Metadata } from "next";
import DashboardGrid from "@/components/dashboard/DashboardGrid";

export const metadata: Metadata = {
  title: {
    default: "B2B Marketplace Admin",
    template: "%s | B2B Marketplace Admin",
  },
  description: "Administration Portal for B2B Marketplace",
  applicationName: "B2B Marketplace Admin",
};

export default function Ecommerce() {
  return (
    <DashboardGrid />
  );
}
