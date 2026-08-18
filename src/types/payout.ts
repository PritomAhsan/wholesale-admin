export type PayoutStatus = "requested" | "processing" | "paid" | "failed";

export interface Payout {
  uuid: string;
  amount: number;
  status: PayoutStatus;
  requested_at: string | null;
  paid_at: string | null;
  reference_note: string | null;
  supplier?: {
    seller_id: string;
    company_name: string;
  };
  seller_orders_count?: number;
}
