"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ComponentCard from "@/components/common/ComponentCard";
import InputField from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";

import SupplierOrderService from "@/api/services/supplier-order.service";
import { SellerOrder, SellerOrderStatus } from "@/types/order";

import OrderStatusBadge from "@/features/orders/components/OrderStatusBadge";

interface Props {
  uuid: string;
}

const STATUS_OPTIONS: { value: SellerOrderStatus; label: string }[] = [
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
];

export default function SupplierOrderDetail({ uuid }: Props) {
  const [order, setOrder] = useState<SellerOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [status, setStatus] = useState<SellerOrderStatus>("processing");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shippingCarrier, setShippingCarrier] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await SupplierOrderService.get(uuid);
      setOrder(data);
      setStatus(
        (["processing", "shipped", "delivered"] as SellerOrderStatus[]).includes(
          data.status
        )
          ? data.status
          : "processing"
      );
      setTrackingNumber(data.tracking_number ?? "");
      setShippingCarrier(data.shipping_carrier ?? "");
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Unable to load order.");
    } finally {
      setLoading(false);
    }
  }, [uuid]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSave() {
    setSaving(true);

    try {
      const updated = await SupplierOrderService.updateStatus(uuid, {
        status: status as Extract<
          SellerOrderStatus,
          "processing" | "shipped" | "delivered"
        >,
        tracking_number: trackingNumber || undefined,
        shipping_carrier: shippingCarrier || undefined,
      });

      setOrder(updated);
    } catch (err) {
      console.error(err);
      alert("Failed to update order.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <ComponentCard title="Order Details" desc="">
      <Link
        href="/supplier-orders"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-gray-400"
      >
        <ArrowLeft size={16} />
        Back to My Orders
      </Link>

      {loading && (
        <p className="py-10 text-center text-gray-400">Loading order...</p>
      )}

      {!loading && error && (
        <p className="py-10 text-center text-error-500">{error}</p>
      )}

      {!loading && !error && order && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
                  {order.seller_order_number}
                </h2>
                {order.order && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Part of {order.order.order_number} — placed{" "}
                    {new Date(order.order.placed_at).toLocaleString()}
                  </p>
                )}
              </div>

              <OrderStatusBadge status={order.status} />
            </div>

            {order.order && (
              <div className="mt-6">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Ship To
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {order.order.shipping.name}
                  <br />
                  {order.order.shipping.address}
                  <br />
                  {order.order.shipping.city}
                  {order.order.shipping.state ? `, ${order.order.shipping.state}` : ""},{" "}
                  {order.order.shipping.country} {order.order.shipping.postal_code}
                  <br />
                  {order.order.shipping.phone}
                </p>
              </div>
            )}

            {order.items && order.items.length > 0 && (
              <div className="mt-6 space-y-3 border-t border-gray-100 pt-6 dark:border-gray-800">
                {order.items.map((item) => (
                  <div key={item.uuid} className="flex items-center gap-3">
                    {item.product_image && (
                      <Image
                        src={item.product_image}
                        alt={item.product_name}
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-lg object-cover"
                      />
                    )}

                    <div className="flex-1">
                      <p className="font-medium text-gray-800 dark:text-white/90">
                        {item.product_name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.quantity} × ${item.unit_price}
                      </p>
                    </div>

                    <p className="font-semibold text-gray-800 dark:text-white/90">
                      ${item.line_total}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex justify-end border-t border-gray-100 pt-4 dark:border-gray-800">
              <span className="text-gray-500 dark:text-gray-400">Subtotal:</span>
              <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white/90">
                ${order.subtotal}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-white/90">
              Update Fulfillment
            </h3>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <Select
                  value={status}
                  options={STATUS_OPTIONS}
                  onChange={(value) => setStatus(value as SellerOrderStatus)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Tracking Number
                </label>
                <InputField
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. TRK123456789"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Shipping Carrier
                </label>
                <InputField
                  value={shippingCarrier}
                  onChange={(e) => setShippingCarrier(e.target.value)}
                  placeholder="e.g. DHL"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </ComponentCard>
  );
}
