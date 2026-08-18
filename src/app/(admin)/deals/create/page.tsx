import { Metadata } from "next";

import CreateDealManager from "@/features/deals/CreateDealManager";

export const metadata: Metadata = {
  title: "New Deal",
};

export default function CreateDealPage() {
  return <CreateDealManager />;
}
