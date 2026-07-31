export type CategoryStatus = "active" | "inactive";

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  parentId: number | null;
  parentName: string | null;
  productCount: number;
  status: CategoryStatus;
  createdAt: string;
}