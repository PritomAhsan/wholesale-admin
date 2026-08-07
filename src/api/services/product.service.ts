import api from "../axios";

import {
  ServerTableQuery,
  ServerTableResponse,
} from "@/types/server-table";

import { ProductListItem } from "@/types/product";

class ProductService {
  /**
   * Product List
   */
  async getAll(
    params?: ServerTableQuery
  ): Promise<
    ServerTableResponse<ProductListItem>
  > {
    const { data } = await api.get(
      "/v1/admin/products",
      {
        params,
      }
    );

    return {
      items: data.data.products,
      pagination: data.data.pagination,
    };
  }

  /**
   * Single Product
   */
  async get(
    uuid: string
  ) {
    const { data } = await api.get(
      `/v1/admin/products/${uuid}`
    );

    return data.data.product;
  }

    /**
     * Create Product
     */
    async create(payload: FormData) {
        const { data } = await api.post(
            "/v1/admin/products",
            payload,
            {
            headers: {
                "Content-Type":
                "multipart/form-data",
            },
            }
        );

        return data.data.product;
    }

/**
 * Update Product
 */
async update(
    uuid: string,
    payload: FormData
) {

    const { data } =
        await api.post(

            `/v1/admin/products/${uuid}`,

            payload,

            {

                headers: {

                    "Content-Type":
                        "multipart/form-data",

                },

            }

        );

    return data.data.product;

}

  /**
   * Delete
   */
  async delete(
    uuid: string
  ) {
    const { data } = await api.delete(
      `/v1/admin/products/${uuid}`
    );

    return data;
  }

  /**
 * Upload Product Images
 */
async uploadImages(
  uuid: string,
  payload: FormData
) {
  const { data } = await api.post(
    `/v1/admin/products/${uuid}/images`,
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
 * Create Variant
 */
async createVariant(
  uuid: string,
  payload: any
) {
  const { data } = await api.post(
    `/v1/admin/products/${uuid}/variants`,
    payload
  );

  return data;
}

}

export default new ProductService();