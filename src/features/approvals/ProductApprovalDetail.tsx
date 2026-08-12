"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ComponentCard from "@/components/common/ComponentCard";

import ProductService from "@/api/services/product.service";

import ProductStatusBadge from "./components/ProductStatusBadge";
import ActionButtons from "./detail/ActionButtons";
import ProductTimeline from "./detail/ProductTimeline";

interface Props {
  uuid: string;
}

export default function ProductApprovalDetail({ uuid }: Props) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const load = useCallback(async () => {
    try {
      setLoading(true);

      const response = await ProductService.get(uuid);

      setProduct(response);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Product not found.");
    } finally {
      setLoading(false);
    }
  }, [uuid]);

  useEffect(() => {
    load();
  }, [load]);

  const handleChanged = () => {
    load();
    setRefreshKey((k) => k + 1);
  };

  if (loading) {
    return (
      <ComponentCard title="Product Review" desc="Loading product...">
        <div className="py-12 text-center">Loading...</div>
      </ComponentCard>
    );
  }

  if (error || !product) {
    return (
      <ComponentCard title="Product Review" desc="Product not found.">
        <div className="py-12 text-center text-red-500">{error}</div>
      </ComponentCard>
    );
  }

  const primaryImage =
    product.images?.find((img: any) => img.is_primary) ??
    product.images?.[0];

  return (
    <ComponentCard
      title="Product Review"
      desc="Approval and publish status for this product."
    >
      <Link
        href="/approvals"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-600"
      >
        <ArrowLeft size={16} />
        Back to approvals
      </Link>

      <div className="mb-8 flex flex-col gap-6 rounded-2xl border border-gray-200 p-6 dark:border-gray-800 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-200">
            <Image
              src={
                primaryImage?.image_url ??
                "/images/product-placeholder.png"
              }
              alt={product.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div>
            <div className="mb-1 flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                {product.name}
              </h3>

              <ProductStatusBadge status={product.status} />
            </div>

            <p className="text-sm text-gray-500">
              SKU: {product.sku}
              {product.supplier?.name && (
                <> &middot; Supplier: {product.supplier.name}</>
              )}
            </p>
          </div>
        </div>

        <Link
          href={`/products/${product.uuid}/edit`}
          className="text-sm text-brand-600 hover:underline"
        >
          Edit product details
        </Link>
      </div>

      <div className="mb-8">
        <h4 className="mb-4 text-base font-semibold text-gray-800 dark:text-white/90">
          Actions
        </h4>

        <ActionButtons
          productUuid={product.uuid}
          productName={product.name}
          status={product.status}
          onChanged={handleChanged}
        />
      </div>

      <div>
        <h4 className="mb-4 text-base font-semibold text-gray-800 dark:text-white/90">
          History
        </h4>

        <ProductTimeline productUuid={product.uuid} refreshKey={refreshKey} />
      </div>
    </ComponentCard>
  );
}
