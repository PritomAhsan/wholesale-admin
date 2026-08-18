export type DisputeStatus = "open" | "resolved" | "rejected";

export type DisputeResolution =
  | "refund_full"
  | "refund_partial"
  | "replacement"
  | "no_action";

export interface DisputeImage {
  id: number;
  image_url: string;
  uploaded_by_role: "admin" | "buyer";
  created_at: string;
}

export interface Dispute {
  uuid: string;
  reason: string;
  description: string;
  status: DisputeStatus;
  resolution: DisputeResolution | null;
  resolution_amount: number | null;
  resolution_note: string | null;
  resolved_at: string | null;
  created_at: string;
  buyer?: string;
  resolved_by?: string | null;
  seller_order?: {
    uuid: string;
    seller_order_number: string;
    subtotal: number;
    payable_amount: number | null;
    paid_out: boolean;
    delivered_at: string | null;
    seller_id: string | null;
  };
  images: DisputeImage[];
}

export const DISPUTE_REASON_LABELS: Record<string, string> = {
  not_received: "Never received",
  damaged: "Arrived damaged",
  wrong_item: "Wrong item",
  quantity_mismatch: "Quantity doesn't match",
  counterfeit: "Suspected counterfeit",
  late_shipment: "Shipped very late",
  seller_not_responding: "Seller not responding",
  refund_not_received: "Refund not received",
  other: "Other",
};
