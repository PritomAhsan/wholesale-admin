"use client";

import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import CategoryStatusBadge from "./CategoryStatusBadge";
import CategoryActions from "./CategoryActions";

// import { useCategories } from "@/hooks/useCategories";
import { Category } from "../types";

interface Props {
  categories: Category[];

  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };

  loading: boolean;

  error: string | null;

  onRefresh: () => void;

  onPageChange: (
    page: number
  ) => void;
}

export default function CategoryTable({
    categories,
    pagination,
    loading,
    error,
    onRefresh,
    onPageChange,
}: Props) {
  // const {
  //   categories,
  //   loading,
  //   error,
  // } = useCategories();

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-white/[0.03]">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-red-600 dark:border-red-800 dark:bg-red-900/20">
        {error}
      </div>
    );
  }

  console.log(categories);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>Category</TableCell>
              <TableCell isHeader>Slug</TableCell>
              <TableCell isHeader>Parent</TableCell>
              <TableCell isHeader>Children</TableCell>
              <TableCell isHeader>Status</TableCell>
              <TableCell isHeader>Created</TableCell>
              <TableCell
                isHeader
                className="text-right"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-10 text-center text-gray-500"
                >
                  No categories found.
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
                
                <TableRow key={category.uuid}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                        <Image
                          src={
                            category.image ??
                            "/images/category-placeholder.png"
                          }
                          alt={
                            category.name ||
                            "Category"
                          }
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {category.name ||
                            "(No Name)"}
                        </p>

                        {category.description && (
                          <p className="mt-1 line-clamp-1 text-xs text-gray-500">
                            {
                              category.description
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    {category.slug}
                  </TableCell>

                  <TableCell>
                    {category.parent_id ??
                      "-"}
                  </TableCell>

                  <TableCell>
                    {
                      category.children_count
                    }
                  </TableCell>

                  <TableCell>
                    <CategoryStatusBadge
                      status={category.status}
                    />
                  </TableCell>

                  <TableCell>
                    {new Date(
                      category.created_at
                    ).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right">
                    <CategoryActions
    id={category.uuid}
    name={category.name}
    onDeleted={onRefresh}
/>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}