import api from "../axios";

import {
  ServerTableQuery,
  ServerTableResponse,
} from "@/types/server-table";

import { Brand } from "@/types/brand";

class BrandService {
  /**
   * Brand List
   */
  async getAll(
    params?: ServerTableQuery
  ): Promise<ServerTableResponse<Brand>> {
    const { data } = await api.get(
      "/v1/admin/brands",
      {
        params,
      }
    );

    return {
      items: data.data.brands,
      pagination: data.data.pagination,
    };
  }

  /**
   * Single Brand
   */
  async get(
    uuid: string
  ): Promise<Brand> {
    const { data } = await api.get(
      `/v1/admin/brands/${uuid}`
    );

    return data.data.brand;
  }

  /**
   * Create Brand
   */
  async create(
    payload: FormData
  ) {
    const { data } = await api.post(
      "/v1/admin/brands",
      payload,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return data;
  }

  /**
   * Update Brand
   */
  async update(
    uuid: string,
    payload: FormData
  ) {
    const { data } = await api.post(
      `/v1/admin/brands/${uuid}?_method=PUT`,
      payload,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return data;
  }

  /**
   * Toggle Status
   */
  async toggleStatus(
    uuid: string
  ) {
    const { data } = await api.patch(
      `/v1/admin/brands/${uuid}/toggle-status`
    );

    return data;
  }

  /**
   * Toggle Featured
   */
  async toggleFeatured(
    uuid: string
  ) {
    const { data } = await api.patch(
      `/v1/admin/brands/${uuid}/toggle-featured`
    );

    return data;
  }

  /**
   * Restore Brand
   */
  async restore(
    uuid: string
  ) {
    const { data } = await api.patch(
      `/v1/admin/brands/${uuid}/restore`
    );

    return data;
  }

  /**
   * Force Delete
   */
  async forceDelete(
    uuid: string
  ) {
    const { data } = await api.delete(
      `/v1/admin/brands/${uuid}/force-delete`
    );

    return data;
  }

  /**
   * Delete Brand
   */
  async delete(
    uuid: string
  ) {
    const { data } = await api.delete(
      `/v1/admin/brands/${uuid}`
    );

    return data;
  }
}

export default new BrandService();