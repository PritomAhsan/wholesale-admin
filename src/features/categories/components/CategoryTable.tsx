"use client";

import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { categories } from "../data/categories";
import CategoryStatusBadge from "./CategoryStatusBadge";
import CategoryActions from "./CategoryActions";

export default function CategoryTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>Category</TableCell>
              <TableCell isHeader>Slug</TableCell>
              <TableCell isHeader>Parent</TableCell>
              <TableCell isHeader>Products</TableCell>
              <TableCell isHeader>Status</TableCell>
              <TableCell isHeader>Created</TableCell>
              <TableCell isHeader className="text-right">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-gray-200">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <span className="font-medium">
                      {category.name}
                    </span>
                  </div>
                </TableCell>

                <TableCell>{category.slug}</TableCell>

                <TableCell>
                  {category.parentName ?? "-"}
                </TableCell>

                <TableCell>
                  {category.productCount}
                </TableCell>

                <TableCell>
                  <CategoryStatusBadge
                    status={category.status}
                  />
                </TableCell>

                <TableCell>
                  {category.createdAt}
                </TableCell>

                <TableCell className="text-right">
                  <CategoryActions
  id={category.id}
  name={category.name}
/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}