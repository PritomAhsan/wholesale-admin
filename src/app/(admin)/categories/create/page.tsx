import { Metadata } from "next";

import CreateCategoryManager from "@/features/categories/CreateCategoryManager";

export const metadata: Metadata = {
  title: "Create Category",
};

export default function CreateCategoryPage() {
  return <CreateCategoryManager />;
}