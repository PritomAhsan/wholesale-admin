"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Package } from "lucide-react";

import { DashboardProduct } from "@/types/dashboard";

interface Props {
  products: DashboardProduct[];
}

export default function LatestProducts({ products }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 p-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Latest Products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Recently added marketplace products
          </p>
        </div>

        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
          {products.length} New
        </span>
      </div>

      {products.length === 0 ? (
        <p className="p-6 text-center text-sm text-gray-400">
          No products yet.
        </p>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {products.map((product) => (
            <div
              key={product.uuid}
              className="flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"
            >
              <div className="flex items-center gap-4">
                <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Package className="h-6 w-6 text-gray-400" />
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </h3>

                  {product.supplier && (
                    <p className="text-sm text-gray-500">{product.supplier}</p>
                  )}

                  <div className="mt-2 flex items-center gap-3">
                    <span className="font-semibold text-brand-600">
                      ${product.price}
                    </span>

                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium capitalize text-gray-600 dark:bg-white/5 dark:text-gray-300">
                      {product.status}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href={`/products/${product.uuid}/edit`}
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Eye className="h-4 w-4" />
                View
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-gray-200 dark:border-gray-800 p-4 text-center">
        <Link
          href="/products"
          className="text-sm font-medium text-brand-600 hover:underline"
        >
          View All Products →
        </Link>
      </div>
    </div>
  );
}
