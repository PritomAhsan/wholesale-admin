export type DealType = "flash" | "bulk" | "clearance";
export type DealStatus = "active" | "inactive";

export interface Deal {
  uuid: string;
  product_id: number;
  type: DealType;
  title: string;
  description: string | null;
  discount_percent: number | null;
  discount_price: string | null;
  min_quantity: number | null;
  starts_at: string | null;
  ends_at: string | null;
  status: DealStatus;
  product?: {
    id: number;
    uuid: string;
    name: string;
    selling_price: string;
  };
  created_at: string;
}

export interface DealAlertSubscription {
  uuid: string;
  email: string;
  subscribed_at: string | null;
}
