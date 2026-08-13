export type RfqStatus =
  | "pending"
  | "quoted"
  | "accepted"
  | "rejected"
  | "closed";

export interface Rfq {
  uuid: string;
  product_name: string;
  preferred_supplier_name: string | null;
  supplier: { uuid: string; display_name: string } | null;
  quantity: string;
  unit: string;
  budget: string | null;
  destination_country: string;
  required_delivery_date: string | null;
  message: string;
  attachment_url: string | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  status: RfqStatus;
  admin_response: string | null;
  responded_at: string | null;
  created_at: string;
}
