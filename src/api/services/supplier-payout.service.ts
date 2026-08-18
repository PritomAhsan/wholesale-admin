import api from "../axios";

import { Payout } from "@/types/payout";
import { ServerPagination } from "@/types/server-table";

class SupplierPayoutService {
  async getAll(
    params?: { page?: number; per_page?: number }
  ): Promise<{ items: Payout[]; pagination: ServerPagination; pending_amount: number }> {
    const { data } = await api.get("/v1/supplier/payouts", {
      params: { page: params?.page, per_page: params?.per_page },
    });

    return {
      items: data.data.payouts,
      pagination: data.data.pagination,
      pending_amount: data.data.pending_amount,
    };
  }

  async request(): Promise<Payout> {
    const { data } = await api.post("/v1/supplier/payouts");
    return data.data.payout;
  }
}

export default new SupplierPayoutService();
