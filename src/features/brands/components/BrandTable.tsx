"use client";

import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import BrandStatusBadge from "./BrandStatusBadge";
import BrandFeaturedBadge from "./BrandFeaturedBadge";
import BrandActions from "./BrandActions";

import { Brand } from "@/types/brand";
import { ServerPagination } from "@/types/server-table";

interface Props {
  brands: Brand[];

  pagination: ServerPagination;

  loading: boolean;

  error: string | null;

  onRefresh: () => void;

  onPageChange: (
    page: number
  ) => void;
}

export default function BrandTable({
  brands,
  pagination,
  loading,
  error,
  onRefresh,
  onPageChange,
}: Props) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-white/[0.03]">
        Loading brands...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-red-600 dark:border-red-900 dark:bg-red-950/30">
        {error}
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:border-gray-800 dark:bg-white/[0.03]">
        No brands found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>
                Brand
              </TableCell>

              <TableCell isHeader>
                Slug
              </TableCell>

              <TableCell isHeader>
                Website
              </TableCell>

              <TableCell isHeader>
                Products
              </TableCell>

              <TableCell isHeader>
                Featured
              </TableCell>

              <TableCell isHeader>
                Status
              </TableCell>

              <TableCell isHeader>
                Created
              </TableCell>

              <TableCell
                isHeader
                className="text-right"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>

                        {brands.map((brand) => (
              <TableRow
                key={brand.uuid}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-gray-200">
                      <Image
                        src={
                          brand.logo ??
                          "/images/brand-placeholder.png"
                        }
                        alt={
                          brand.name
                        }
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div>
                      <p className="font-medium text-gray-800 dark:text-white/90">
                        {brand.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {brand.uuid}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  {brand.slug}
                </TableCell>

                <TableCell>
                  {brand.website ? (
                    <a
                      href={
                        brand.website
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-600 hover:underline"
                    >
                      Visit
                    </a>
                  ) : (
                    "-"
                  )}
                </TableCell>

                <TableCell>
                  {
                    brand.products_count
                  }
                </TableCell>

                <TableCell>
                  <BrandFeaturedBadge
                    featured={
                      brand.featured
                    }
                  />
                </TableCell>

                <TableCell>
                  <BrandStatusBadge
                    status={
                      brand.status
                    }
                  />
                </TableCell>

                <TableCell>
                  {new Date(
                    brand.created_at
                  ).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right">
                  <BrandActions
                    id={brand.uuid}
                    name={brand.name}
                    onDeleted={
                      onRefresh
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

            {pagination.last_page > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-800">
          <div className="text-sm text-gray-500">
            Showing page{" "}
            <span className="font-medium">
              {pagination.current_page}
            </span>{" "}
            of{" "}
            <span className="font-medium">
              {pagination.last_page}
            </span>{" "}
            ({pagination.total} brands)
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={
                pagination.current_page ===
                1
              }
              onClick={() =>
                onPageChange(
                  pagination.current_page -
                    1
                )
              }
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={
                pagination.current_page ===
                pagination.last_page
              }
              onClick={() =>
                onPageChange(
                  pagination.current_page +
                    1
                )
              }
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}