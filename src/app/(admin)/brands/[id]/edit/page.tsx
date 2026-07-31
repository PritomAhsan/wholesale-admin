import { Metadata } from "next";

import EditBrandManager from "@/features/brands/EditBrandManager";

export const metadata: Metadata = {
  title: "Edit Brand",
};

export default function EditBrandPage() {
  return <EditBrandManager />;
}