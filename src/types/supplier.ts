export type SupplierStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "suspended";

export interface Supplier {
  uuid: string;

  seller_id: string | null;

  company_name: string;

  company_slug: string;

  business_type: string;

  contact_person: string;

  email: string;

  phone: string;

  website: string | null;

  registration_number: string | null;

  tax_number: string | null;

  description: string | null;

  fulfillment_region: string | null;

  typical_lead_time: string | null;

  logo: string | null;

  banner: string | null;

  status: SupplierStatus;

  products_count: number;

  created_at: string;
}
