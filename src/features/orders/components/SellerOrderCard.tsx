"use client";

import { useState } from "react";
import Image from "next/image";

import InputField from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";

import OrderService from "@/api/services/order.service";
import { Order, SellerOrder, SellerOrderStatus, TrackingResult } from "@/types/order";
import OrderStatusBadge from "./OrderStatusBadge";

interface Props {
  sellerOrder: SellerOrder;
  onUpdated: (order: Order) => void;
}

const STATUS_OPTIONS: { value: SellerOrderStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export default function SellerOrderCard({ sellerOrder, onUpdated }: Props) {
  const [status, setStatus] = useState<SellerOrderStatus>(sellerOrder.status);
  const [trackingNumber, setTrackingNumber] = useState(
    sellerOrder.tracking_number ?? ""
  );
  const [shippingCarrier, setShippingCarrier] = useState(
    sellerOrder.shipping_carrier ?? ""
  );
  const [saving, setSaving] = useState(false);

  const [tracking, setTracking] = useState<TrackingResult | null>(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState<string | null>(null);

  const dirty =
    status !== sellerOrder.status ||
    trackingNumber !== (sellerOrder.tracking_number ?? "") ||
    shippingCarrier !== (sellerOrder.shipping_carrier ?? "");

  async function handleSave() {
    setSaving(true);

    try {
      const order = await OrderService.updateSellerOrderStatus(
        sellerOrder.uuid,
        {
          status,
          tracking_number: trackingNumber || undefined,
          shipping_carrier: shippingCarrier || undefined,
        }
      );

      onUpdated(order);
    } catch (error) {
      console.error(error);
      alert("Failed to update seller order.");
    } finally {
      setSaving(false);
    }
  }

  async function handleTrack() {
    setTrackingLoading(true);
    setTrackingError(null);
    setTracking(null);

    try {
      const result = await OrderService.getTracking(sellerOrder.uuid);
      setTracking(result);
    } catch (error) {
      console.error(error);
      setTrackingError("Unable to fetch tracking status right now.");
    } finally {
      setTrackingLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{sellerOrder.seller_order_number}</p>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white/90">
            {sellerOrder.supplier?.company_name ?? sellerOrder.supplier?.display_name}
          </h3>
        </div>

        <OrderStatusBadge status={sellerOrder.status} />
      </div>

      {sellerOrder.items && sellerOrder.items.length > 0 && (
        <div className="mt-4 space-y-3 border-t border-gray-100 pt-4 dark:border-gray-800">
          {sellerOrder.items.map((item) => (
            <div key={item.uuid} className="flex items-center gap-3">
              {item.product_image && (
                <Image
                  src={item.product_image}
                  alt={item.product_name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-lg object-cover"
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

      <div className="mt-4 flex justify-end border-t border-gray-100 pt-4 text-sm dark:border-gray-800">
        <span className="text-gray-500 dark:text-gray-400">Subtotal:</span>
        <span className="ml-2 font-bold text-gray-800 dark:text-white/90">
          ${sellerOrder.subtotal}
        </span>
      </div>

      <div className="mt-6 grid gap-4 border-t border-gray-100 pt-6 dark:border-gray-800 md:grid-cols-3">
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

      <div className="mt-4 flex flex-wrap justify-end gap-3">
        {sellerOrder.tracking_number && sellerOrder.shipping_carrier && (
          <Button
            variant="outline"
            onClick={handleTrack}
            disabled={trackingLoading}
          >
            {trackingLoading ? "Tracking..." : "Track Package"}
          </Button>
        )}

        <Button onClick={handleSave} disabled={!dirty || saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {trackingError && (
        <p className="mt-3 text-right text-sm text-error-500">
          {trackingError}
        </p>
      )}

      {tracking && !tracking.available && (
        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500 dark:border-gray-800 dark:bg-white/5 dark:text-gray-400">
          Live tracking isn&apos;t available for this carrier/tracking number
          right now.
        </div>
      )}

      {tracking?.available && tracking.tracking && (
        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold text-gray-800 dark:text-white/90">
              {tracking.tracking.statusDescription}
            </p>
            {tracking.tracking.estimatedDelivery && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Est. delivery: {tracking.tracking.estimatedDelivery}
              </p>
            )}
          </div>

          {tracking.tracking.events.length > 0 && (
            <ol className="mt-4 space-y-3 border-t border-gray-200 pt-4 dark:border-gray-800">
              {tracking.tracking.events.map((event, i) => (
                <li key={i} className="text-sm">
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    {event.description}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {[event.location, event.timestamp]
                      .filter(Boolean)
                      .join(" — ")}
                  </p>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
}
