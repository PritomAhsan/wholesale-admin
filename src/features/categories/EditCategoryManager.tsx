"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ComponentCard from "@/components/common/ComponentCard";

import CategoryForm from "./components/CategoryForm";

import CategoryService from "@/api/services/category.service";
import { Category } from "@/types/category";

export default function EditCategoryManager() {
  const params = useParams();

  const uuid = params.uuid as string;

  console.log("params", params);

  console.log("uuid", uuid);

  const [category, setCategory] =
    useState<Category | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        setLoading(true);

        const response =
          await CategoryService.get(uuid);

          console.log("CATEGORY", response);

        /**
         * Laravel response:
         *
         * {
         *   success:true,
         *   message:"Success",
         *   data:{...category}
         * }
         */

        setCategory(response);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load category."
        );
      } finally {
        setLoading(false);
      }
    };

    if (uuid) {
      loadCategory();
    }
  }, [uuid]);

  if (loading) {
    return (
      <ComponentCard
        title="Edit Category"
        desc="Loading..."
      >
        <div className="py-16 text-center">
          Loading category...
        </div>
      </ComponentCard>
    );
  }

  if (error) {
    return (
      <ComponentCard
        title="Edit Category"
        desc="Error"
      >
        <div className="py-16 text-center text-red-500">
          {error}
        </div>
      </ComponentCard>
    );
  }

  if (!category) {
    return (
      <ComponentCard
        title="Edit Category"
        desc="Not Found"
      >
        <div className="py-16 text-center">
          Category not found.
        </div>
      </ComponentCard>
    );
  }

  return (
    <ComponentCard
      title="Edit Category"
      desc="Update category information."
    >
      <CategoryForm
        mode="edit"
        initialData={category}
      />
    </ComponentCard>
  );
}