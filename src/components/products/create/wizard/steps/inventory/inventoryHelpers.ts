export function calculateAvailableStock(
  quantity: number,
  reserved: number
) {
  return Math.max(0, quantity - reserved);
}

export function getStockStatus(
  available: number,
  threshold: number
): "in-stock" | "low-stock" | "out-of-stock" {
  if (available <= 0) {
    return "out-of-stock";
  }

  if (available <= threshold) {
    return "low-stock";
  }

  return "in-stock";
}

export function getStockStatusLabel(
  status: ReturnType<typeof getStockStatus>
) {
  switch (status) {
    case "in-stock":
      return "In Stock";

    case "low-stock":
      return "Low Stock";

    case "out-of-stock":
      return "Out of Stock";
  }
}