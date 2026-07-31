export type SupplierStatus = "active" | "inactive";

export type VerificationStatus =
  | "verified"
  | "pending";

export interface Supplier {
  id: number;

  companyName: string;

  slug: string;

  logo: string;

  coverImage?: string;

  description?: string;

  contactPerson: string;

  email: string;

  phone?: string;

  website?: string;

  businessType?: string;

  establishedYear?: string;

  country: string;

  city?: string;

  address?: string;

  productCount: number;

  verificationStatus: VerificationStatus;

  status: SupplierStatus;

  createdAt: string;
}