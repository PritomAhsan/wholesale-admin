import api from "../axios";

import {
  ServerTableQuery,
  ServerTableResponse,
} from "@/types/server-table";

import { Category } from "@/types/category";

class CategoryService {
  /**
   * Category List
   */
  async getAll(
    params?: ServerTableQuery
  ): Promise<ServerTableResponse<Category>> {
    const { data } = await api.get(
      "/v1/admin/categories",
      {
        params,
      }
    );

    return {
      items: data.data.categories,
      pagination: data.data.pagination,
    };
  }

  /**
   * Single Category
   */
  async get(
    uuid: string
  ): Promise<Category> {
    const { data } = await api.get(
      `/v1/admin/categories/${uuid}`
    );

    return data.data.category;
  }

  /**
   * Create
   */
  async create(
    payload: FormData
  ) {
    const { data } = await api.post(
      "/v1/admin/categories",
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
   * Update
   */
  async update(
    uuid: string,
    payload: FormData
  ) {
    const { data } = await api.post(
      `/v1/admin/categories/${uuid}?_method=PUT`,
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
   * Delete
   */
  async delete(
    uuid: string
  ) {
    const { data } = await api.delete(
      `/v1/admin/categories/${uuid}`
    );

    return data;
  }
}

export default new CategoryService();