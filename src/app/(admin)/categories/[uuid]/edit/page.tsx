import { Metadata } from "next";

import EditCategoryManager from "@/features/categories/EditCategoryManager";

export const metadata: Metadata = {
  title: "Edit Category",
};

export default function EditCategoryPage() {
  return <EditCategoryManager />;
}