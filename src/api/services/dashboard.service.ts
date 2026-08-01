import api from "../axios";
import { API } from "../endpoints";

import { DashboardResponse } from "@/types/dashboard";

class DashboardService {
  async getDashboard() {
    const { data } =
      await api.get<DashboardResponse>(
        API.DASHBOARD
      );

    return data;
  }
}

export default new DashboardService();