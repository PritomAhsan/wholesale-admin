import api from "../axios";

import {
  InventoryDashboard,
  InventoryTransaction,
  InventoryVariantSummary,
} from "@/types/inventory";

class InventoryService {
  async dashboard(): Promise<InventoryDashboard> {
    const { data } = await api.get("/v1/admin/inventory/dashboard");
    return data.data.dashboard;
  }

  async lowStock(): Promise<InventoryVariantSummary[]> {
    const { data } = await api.get("/v1/admin/inventory/reports/low-stock");
    return data.data.variants;
  }

  async outOfStock(): Promise<InventoryVariantSummary[]> {
    const { data } = await api.get("/v1/admin/inventory/reports/out-of-stock");
    return data.data.variants;
  }

  async inventoryValue(): Promise<InventoryVariantSummary[]> {
    const { data } = await api.get("/v1/admin/inventory/reports/value");
    return data.data.variants;
  }

  async recentTransactions(): Promise<InventoryTransaction[]> {
    const { data } = await api.get("/v1/admin/inventory/reports/recent-transactions");
    return data.data.transactions;
  }
}

export default new InventoryService();
