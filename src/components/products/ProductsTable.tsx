"use client";

import Image from "next/image";
import { Edit, Eye, Trash2 } from "lucide-react";

import { products } from "./data";
import ProductStatusBadge from "./ProductStatusBadge";
import ProductVisibilityBadge from "./ProductVisibilityBadge";

export default function ProductsTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-4 text-left">
                <input type="checkbox" />
              </th>

              <th className="px-6 py-4 text-left">Product</th>

              <th className="px-6 py-4 text-left">Supplier</th>

              <th className="px-6 py-4 text-left">Category</th>

              <th className="px-6 py-4 text-left">Price</th>

              <th className="px-6 py-4 text-left">Stock</th>

              <th className="px-6 py-4 text-left">Approval</th>

              <th className="px-6 py-4 text-left">Status</th>

              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-100 dark:border-gray-800"
              >
                <td className="px-6 py-4">
                  <input type="checkbox" />
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={60}
                      height={60}
                      className="rounded-xl object-cover"
                    />

                    <div>
                      <div className="font-semibold">
                        {product.name}
                      </div>

                      <div className="text-sm text-gray-500">
                        {product.sku}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {product.supplier}
                </td>

                <td className="px-6 py-4">
                  {product.category}
                </td>

                <td className="px-6 py-4">
                  {product.price}
                </td>

                <td className="px-6 py-4">
                  {product.stock}
                </td>

                <td className="px-6 py-4">
                  <ProductStatusBadge
                    status={product.approval}
                  />
                </td>

                <td className="px-6 py-4">
                  <ProductVisibilityBadge
                    status={product.status}
                  />
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Eye size={18} />
                    </button>

                    <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Edit size={18} />
                    </button>

                    <button className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}