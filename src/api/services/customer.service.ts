import api from "../axios";

import { ServerTableQuery, ServerTableResponse } from "@/types/server-table";
import { Customer, CustomerDetailResponse } from "@/types/customer";

class CustomerService {
  async getAll(
    params?: Partial<ServerTableQuery>
  ): Promise<ServerTableResponse<Customer>> {
    const { data } = await api.get("/v1/admin/customers", {
      params: { search: params?.search, page: params?.page, per_page: params?.per_page },
    });

    return {
      items: data.data.customers,
      pagination: data.data.pagination,
    };
  }

  async get(uuid: string): Promise<CustomerDetailResponse> {
    const { data } = await api.get(`/v1/admin/customers/${uuid}`);

    return data.data;
  }
}

export default new CustomerService();
