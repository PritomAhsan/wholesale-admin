"use client";

import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import {
  ServerPagination,
} from "@/types/server-table";

import {
  ProductListItem,
} from "@/types/product";

import ProductStatusBadge from "./ProductStatusBadge";
import ProductFeaturedBadge from "./ProductFeaturedBadge";
import ProductActions from "./ProductActions";

interface Props {
  items: ProductListItem[];

  loading: boolean;

  pagination: ServerPagination;

  onPageChange: (
    page: number
  ) => void;

  refresh: () => void;
}

export default function ProductTable({
  items,
  loading,
  pagination,
  onPageChange,
refresh,
}: Props) {
  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>

            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium"
                >
                  Product
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium"
                >
                  Brand
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium"
                >
                  Supplier
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium"
                >
                  Price
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium"
                >
                  Stock
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium"
                >
                  Variants
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium"
                >
                  Status
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium"
                >
                  Featured
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 text-right font-medium"
                >
                  Actions
                </TableCell>

              </TableRow>
            </TableHeader>

            <TableBody>

              {loading && (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="py-12 text-center"
                  >
                    Loading products...
                  </TableCell>
                </TableRow>
              )}

              {!loading &&
                items.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="py-12 text-center"
                    >
                      No products found.
                    </TableCell>
                  </TableRow>
                )}

              {!loading &&
                items.map(
                  (product) => (
                    <TableRow
                      key={product.uuid}
                    >
                      <TableCell className="px-5 py-4">
                        <div className="flex items-center gap-4">

                          <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-gray-200">

                            <Image
                              src={
                                product.primary_image ||
                                "/images/product-placeholder.png"
                              }
                              alt={
                                product.name
                              }
                              fill
                              unoptimized
                              className="object-cover"
                            />

                          </div>

                          <div>

                            <p className="font-medium text-gray-800 dark:text-white">
                              {product.name}
                            </p>

                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              SKU:
                              {" "}
                              {product.sku}
                            </p>

                          </div>

                        </div>
                      </TableCell>
                                            <TableCell className="px-5 py-4">
                        <div className="space-y-1">
                          <p className="font-medium text-gray-800 dark:text-white">
                            {product.brand?.name ??
                              "-"}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="px-5 py-4">
                        <div className="space-y-1">
                          <p className="font-medium text-gray-800 dark:text-white">
                            {product.supplier
                              ?.company_name ??
                              "-"}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="px-5 py-4">
                        <div className="space-y-1">
                          <p className="font-semibold text-brand-600 dark:text-brand-400">
                            $
                            {product.formatted_price}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            product.stock > 0
                              ? "bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400"
                              : "bg-error-50 text-error-700 dark:bg-error-500/10 dark:text-error-400"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </TableCell>

                      <TableCell className="px-5 py-4">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-white/10 dark:text-gray-300">
                          {
                            product.variants_count
                          }
                        </span>
                      </TableCell>

                      <TableCell className="px-5 py-4">
                        <ProductStatusBadge
                          status={
                            product.status
                          }
                        />
                      </TableCell>

                      <TableCell className="px-5 py-4">
                        <ProductFeaturedBadge
                          featured={
                            product.featured
                          }
                        />
                      </TableCell>
                                            <TableCell className="px-5 py-4 text-right">
                        <ProductActions
                          uuid={product.uuid}
                          name={product.name}
                          refresh={refresh}
                        />
                      </TableCell>
                    </TableRow>
                  )
                )}

            </TableBody>

          </Table>
        </div>
      </div>

      {pagination.last_page > 1 && (
  <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-800">
    <div className="text-sm text-gray-500 dark:text-gray-400">
      Showing page{" "}
      <span className="font-medium">
        {pagination.current_page}
      </span>{" "}
      of{" "}
      <span className="font-medium">
        {pagination.last_page}
      </span>{" "}
      ({pagination.total} records)
    </div>

    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={
          pagination.current_page === 1
        }
        onClick={() =>
          onPageChange(
            pagination.current_page - 1
          )
        }
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
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
            pagination.current_page + 1
          )
        }
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        Next
      </button>
    </div>
  </div>
)}
    </>
  );
}