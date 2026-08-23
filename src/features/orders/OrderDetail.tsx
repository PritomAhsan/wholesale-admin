"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import TextArea from "@/components/form/input/TextArea";

import OrderService from "@/api/services/order.service";
import { Order } from "@/types/order";

import OrderStatusBadge from "./components/OrderStatusBadge";
import SellerOrderCard from "./components/SellerOrderCard";

interface Props {
  uuid: string;
}

export default function OrderDetail({ uuid }: Props) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelError, setCancelError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await OrderService.get(uuid);
      setOrder(data);
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

  async function handleCancel() {
    setCancelling(true);
    setCancelError(null);

    try {
      const updated = await OrderService.cancel(uuid, cancelReason || undefined);
      setOrder(updated);
      setShowCancelForm(false);
    } catch (err) {
      console.error(err);
      setCancelError("Failed to cancel order.");
    } finally {
      setCancelling(false);
    }
  }

  return (
    <ComponentCard title="Order Details" desc="">
      <Link
        href="/orders"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-gray-400"
      >
        <ArrowLeft size={16} />
        Back to Orders
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
                  {order.order_number}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Placed {new Date(order.placed_at).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <OrderStatusBadge status={order.status} />

                {order.can_cancel && !showCancelForm && (
                  <Button
                    variant="outline"
                    onClick={() => setShowCancelForm(true)}
                  >
                    Cancel Order
                  </Button>
                )}
              </div>
            </div>

            {order.status === "cancelled" && order.cancellation_reason && (
              <div className="mt-4 rounded-xl bg-error-50 p-4 text-sm text-error-600 dark:bg-error-500/10">
                <span className="font-semibold">Cancellation reason: </span>
                {order.cancellation_reason}
              </div>
            )}

            {order.can_cancel && showCancelForm && (
              <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/5">
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Reason for cancelling (optional)
                </label>

                <TextArea
                  value={cancelReason}
                  onChange={setCancelReason}
                  rows={3}
                  placeholder="Why is this order being cancelled?"
                />

                {cancelError && (
                  <p className="mt-2 text-sm text-error-500">{cancelError}</p>
                )}

                <div className="mt-3 flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowCancelForm(false)}
                    disabled={cancelling}
                  >
                    Never mind
                  </Button>

                  <Button onClick={handleCancel} disabled={cancelling}>
                    {cancelling ? "Cancelling..." : "Confirm Cancellation"}
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Buyer
                </h3>
                <p className="font-medium text-gray-800 dark:text-white/90">
                  {order.buyer?.full_name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{order.buyer?.email}</p>
                {order.buyer?.phone && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">{order.buyer.phone}</p>
                )}
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Shipping Address
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {order.shipping.name}
                  <br />
                  {order.shipping.address}
                  <br />
                  {order.shipping.city}
                  {order.shipping.state ? `, ${order.shipping.state}` : ""},{" "}
                  {order.shipping.country} {order.shipping.postal_code}
                  <br />
                  {order.shipping.phone}
                </p>
              </div>

              {order.shipping.carrier && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Shipping Method (buyer-selected)
                  </h3>
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {order.shipping.carrier} {order.shipping.service}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ${order.shipping.cost} — chosen by the buyer at checkout
                  </p>
                </div>
              )}
            </div>

            {order.notes && (
              <div className="mt-6 rounded-xl bg-gray-50 p-4 text-sm text-gray-600 dark:bg-white/5 dark:text-gray-300">
                <span className="font-semibold">Notes: </span>
                {order.notes}
              </div>
            )}

            <div className="mt-6 border-t border-gray-100 pt-4 dark:border-gray-800">
              {order.shipping.cost && (
                <>
                  <div className="flex justify-end text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Subtotal:</span>
                    <span className="ml-2 font-medium text-gray-700 dark:text-gray-300">
                      ${order.subtotal}
                    </span>
                  </div>
                  <div className="mt-1 flex justify-end text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Shipping:</span>
                    <span className="ml-2 font-medium text-gray-700 dark:text-gray-300">
                      ${order.shipping.cost}
                    </span>
                  </div>
                </>
              )}
              <div className="mt-2 flex justify-end">
                <span className="text-gray-500 dark:text-gray-400">Order Total:</span>
                <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white/90">
                  ${order.total}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white/90">
              Seller Orders ({order.seller_orders.length})
            </h3>

            {order.seller_orders.map((sellerOrder) => (
              <SellerOrderCard
                key={sellerOrder.uuid}
                sellerOrder={sellerOrder}
                onUpdated={setOrder}
              />
            ))}
          </div>
        </div>
      )}
    </ComponentCard>
  );
}
