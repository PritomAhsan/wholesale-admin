export type StockAdjustmentType =
  | "opening"
  | "purchase"
  | "sale"
  | "return"
  | "damage"
  | "adjustment";

export interface StockAdjustment {
  id: string;

  type: StockAdjustmentType;

  quantity: number;

  note: string;

  createdAt: string;
}