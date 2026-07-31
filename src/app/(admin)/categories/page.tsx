import { Metadata } from "next";

import CategoryManager from "@/features/categories/CategoryManager";

export const metadata: Metadata = {
  title: "Categories",
};

export default function CategoriesPage() {
  return <CategoryManager />;
}