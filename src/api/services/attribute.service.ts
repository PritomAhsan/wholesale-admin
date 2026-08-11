import api from "@/api/axios";

import {
  ServerTableQuery,
  ServerTableResponse,
} from "@/types/server-table";

import { Attribute, AttributeValue } from "@/types/attribute";

export interface AttributeLookup {
  id: number;
  uuid?: string;
  name: string;
}

export interface AttributeValueLookup {
  id: number;
  uuid?: string;
  attribute_id: number;
  value: string;
}

const AttributeService = {
  /**
   * Attribute List
   */
  async getAll(
    params?: Partial<ServerTableQuery>
  ): Promise<ServerTableResponse<Attribute>> {
    const { data } = await api.get("/v1/admin/product-attributes", {
      params,
    });

    return {
      items: data.data.attributes,
      pagination: data.data.pagination,
    };
  },

  /**
   * Single Attribute
   */
  async get(uuid: string): Promise<Attribute> {
    const { data } = await api.get(
      `/v1/admin/product-attributes/${uuid}`
    );

    return data.data.attribute;
  },

  /**
   * Create Attribute
   */
  async create(payload: Record<string, any>) {
    const { data } = await api.post(
      "/v1/admin/product-attributes",
      payload
    );

    return data;
  },

  /**
   * Update Attribute
   */
  async update(uuid: string, payload: Record<string, any>) {
    const { data } = await api.put(
      `/v1/admin/product-attributes/${uuid}`,
      payload
    );

    return data;
  },

  /**
   * Delete Attribute
   */
  async delete(uuid: string) {
    const { data } = await api.delete(
      `/v1/admin/product-attributes/${uuid}`
    );

    return data;
  },

  /*
  |--------------------------------------------------------------------------
  | Attribute Values
  |--------------------------------------------------------------------------
  */

  /**
   * Values for a single attribute
   */
  async getValues(
    attributeUuid: string,
    params?: Partial<ServerTableQuery>
  ): Promise<ServerTableResponse<AttributeValue>> {
    const { data } = await api.get(
      `/v1/admin/product-attributes/${attributeUuid}/values`,
      { params }
    );

    return {
      items: data.data.values,
      pagination: data.data.pagination,
    };
  },

  /**
   * Create Attribute Value
   */
  async createValue(
    attributeUuid: string,
    payload: Record<string, any>
  ) {
    const { data } = await api.post(
      `/v1/admin/product-attributes/${attributeUuid}/values`,
      payload
    );

    return data;
  },

  /**
   * Update Attribute Value
   */
  async updateValue(
    valueUuid: string,
    payload: Record<string, any>
  ) {
    const { data } = await api.put(
      `/v1/admin/product-attribute-values/${valueUuid}`,
      payload
    );

    return data;
  },

  /**
   * Delete Attribute Value
   */
  async deleteValue(valueUuid: string) {
    const { data } = await api.delete(
      `/v1/admin/product-attribute-values/${valueUuid}`
    );

    return data;
  },

  /**
   * Toggle Attribute Value Status
   */
  async toggleValueStatus(valueUuid: string) {
    const { data } = await api.patch(
      `/v1/admin/product-attribute-values/${valueUuid}/toggle-status`
    );

    return data;
  },

  /*
  |--------------------------------------------------------------------------
  | Lookups
  |--------------------------------------------------------------------------
  */

  async lookup(): Promise<AttributeLookup[]> {
    const { data } = await api.get("/lookups/attributes");

    return data.data;
  },

  async lookupValues(): Promise<AttributeValueLookup[]> {
    const { data } = await api.get("/lookups/attribute-values");

    return data.data;
  },
};

export default AttributeService;
