export type BrandStatus = "active" | "inactive";

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string;
  productCount: number;
  status: BrandStatus;
  createdAt: string;
}