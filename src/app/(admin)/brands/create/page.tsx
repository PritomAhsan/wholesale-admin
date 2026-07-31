import { Metadata } from "next";

import CreateBrandManager from "@/features/brands/CreateBrandManager";

export const metadata: Metadata = {
  title: "Create Brand",
};

export default function CreateBrandPage() {
  return <CreateBrandManager />;
}