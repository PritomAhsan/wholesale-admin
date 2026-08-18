import api from "../axios";

import { ServerTableResponse } from "@/types/server-table";
import { Payout } from "@/types/payout";

class PayoutService {
  async getAll(
    params?: { page?: number; per_page?: number; status?: string }
  ): Promise<ServerTableResponse<Payout>> {
    const { data } = await api.get("/v1/admin/payouts", {
      params: {
        page: params?.page,
        per_page: params?.per_page,
        status: params?.status,
      },
    });

    return {
      items: data.data.payouts,
      pagination: data.data.pagination,
    };
  }

  async get(uuid: string): Promise<Payout> {
    const { data } = await api.get(`/v1/admin/payouts/${uuid}`);
    return data.data.payout;
  }

  async markPaid(uuid: string, referenceNote?: string) {
    const { data } = await api.patch(`/v1/admin/payouts/${uuid}/mark-paid`, {
      reference_note: referenceNote,
    });
    return data.data.payout;
  }
}

export default new PayoutService();
