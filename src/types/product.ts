export type ProductType =
  | "physical"
  | "digital"
  | "service";

export interface ProductFormData {
  productName: string;

  shortDescription: string;

  categoryId: string;

  brandId: string;

  unitId: string;

  productType: ProductType;

  moq: number;
}