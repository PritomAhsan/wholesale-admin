export interface InventoryDashboard {
  total_variants: number;
  total_stock: number | string;
  inventory_value: number | string;
  low_stock: number;
  out_of_stock: number;
  recent_transactions: number;
}

export interface InventoryVariantSummary {
  variant_uuid: string;
  sku: string;
  product: string | null;
  stock_quantity: number;
  low_stock_quantity: number;
  cost_price: string;
  inventory_value: number;
}

export interface InventoryTransaction {
  uuid: string;
  transaction_type: string;
  movement_type: string;
  quantity: number;
  stock_before: number;
  stock_after: number;
  remarks: string | null;
  created_by: string | null;
  created_at: string;
}
