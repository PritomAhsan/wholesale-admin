export type SupplierStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "suspended";

export interface Supplier {
  uuid: string;

  company_name: string;

  company_slug: string;

  business_type: string;

  contact_person: string;

  email: string;

  phone: string;

  website: string | null;

  description: string | null;

  logo: string | null;

  banner: string | null;

  status: SupplierStatus;

  products_count: number;

  created_at: string;
}
