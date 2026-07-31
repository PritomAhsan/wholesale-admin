import { ProductInventory } from "./inventoryTypes";

export function calculateAvailableStock(
  quantity: number,
  reservedQuantity: number
) {
  return Math.max(0, quantity - reservedQuantity);
}

export function isLowStock(
  inventory: ProductInventory
) {
  return (
    inventory.availableQuantity <=
    inventory.lowStockThreshold
  );
}

export function stockStatus(
  inventory: ProductInventory
) {
  if (inventory.availableQuantity <= 0)
    return "Out of Stock";

  if (isLowStock(inventory))
    return "Low Stock";

  return "In Stock";
}