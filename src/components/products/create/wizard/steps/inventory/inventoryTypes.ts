export interface InventorySettings {
  trackInventory: boolean;
  allowBackorders: boolean;
  continueSellingWhenOutOfStock: boolean;
  lowStockThreshold: number;
}

export interface WarehouseStock {
  id: string;
  warehouseId: string;
  warehouseName: string;
  quantity: number;
  reservedQuantity: number;
}

export interface ProductInventory {
  sku: string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  incomingQuantity: number;
  lowStockThreshold: number;
  trackInventory: boolean;
  allowBackorders: boolean;
  continueSellingWhenOutOfStock: boolean;
  warehouses: WarehouseStock[];
}

export const defaultInventorySettings: InventorySettings = {
  trackInventory: true,
  allowBackorders: false,
  continueSellingWhenOutOfStock: false,
  lowStockThreshold: 10,
};