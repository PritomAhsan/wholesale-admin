"use client";

import Image from "next/image";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

type PendingProduct = {
  id: number;
  image: string;
  name: string;
  supplier: string;
  category: string;
  submitted: string;
};

const products: PendingProduct[] = [
  {
    id: 1,
    image: "/images/products/product-1.jpg",
    name: "Industrial Safety Helmet",
    supplier: "ABC Industrial Ltd.",
    category: "Safety Equipment",
    submitted: "2 hours ago",
  },
  {
    id: 2,
    image: "/images/products/product-2.jpg",
    name: "Wireless Barcode Scanner",
    supplier: "Smart Tech Co.",
    category: "Electronics",
    submitted: "5 hours ago",
  },
  {
    id: 3,
    image: "/images/products/product-3.jpg",
    name: "Premium Office Chair",
    supplier: "Office World",
    category: "Furniture",
    submitted: "Yesterday",
  },
];

export default function PendingProducts() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 p-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Pending Product Approvals
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Products waiting for review
          </p>
        </div>

        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
          {products.length} Pending
        </span>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {product.supplier}
                </p>

                <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                  <span>{product.category}</span>

                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {product.submitted}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700">
                <CheckCircle2 className="h-4 w-4" />
                Approve
              </button>

              <button className="flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20">
                <XCircle className="h-4 w-4" />
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 p-4 text-center">
        <button className="text-sm font-medium text-brand-600 hover:underline">
          View All Pending Products →
        </button>
      </div>
    </div>
  );
}