import { ProductInventory } from "./inventoryTypes";

export const defaultInventory: ProductInventory = {
  sku: "",

  quantity: 0,

  reservedQuantity: 0,

  availableQuantity: 0,

  incomingQuantity: 0,

  lowStockThreshold: 10,

  trackInventory: true,

  allowBackorders: false,

  continueSellingWhenOutOfStock: false,

  warehouses: [],
};