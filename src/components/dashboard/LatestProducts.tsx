"use client";

import Image from "next/image";
import { Eye, Package } from "lucide-react";

type Product = {
  id: number;
  image: string;
  name: string;
  supplier: string;
  price: string;
  status: "Published" | "Pending";
};

const products: Product[] = [
  {
    id: 1,
    image: "/images/products/product-1.jpg",
    name: "Industrial Safety Helmet",
    supplier: "ABC Industrial Ltd.",
    price: "$12.50",
    status: "Published",
  },
  {
    id: 2,
    image: "/images/products/product-2.jpg",
    name: "Wireless Barcode Scanner",
    supplier: "Smart Electronics",
    price: "$38.00",
    status: "Pending",
  },
  {
    id: 3,
    image: "/images/products/product-3.jpg",
    name: "Premium Office Chair",
    supplier: "Modern Furniture",
    price: "$95.00",
    status: "Published",
  },
];

export default function LatestProducts() {
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

      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"
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

                <div className="mt-2 flex items-center gap-3">
                  <span className="font-semibold text-brand-600">
                    {product.price}
                  </span>

                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      product.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
              <Eye className="h-4 w-4" />
              View
            </button>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 p-4 text-center">
        <button className="text-sm font-medium text-brand-600 hover:underline">
          View All Products →
        </button>
      </div>
    </div>
  );
}