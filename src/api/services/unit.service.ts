import api from "../axios";

import {
  ServerTableQuery,
  ServerTableResponse,
} from "@/types/server-table";

import { Unit } from "@/types/unit";

class UnitService {
  /**
   * Unit List
   */
  async getAll(
    params?: Partial<ServerTableQuery>
  ): Promise<ServerTableResponse<Unit>> {
    const { data } = await api.get(
      "/v1/admin/units",
      {
        params,
      }
    );

    return {
      items: data.data.units,
      pagination: data.data.pagination,
    };
  }

  /**
   * Single Unit
   */
  async get(uuid: string): Promise<Unit> {
    const { data } = await api.get(
      `/v1/admin/units/${uuid}`
    );

    return data.data.unit;
  }

  /**
   * Create Unit
   */
  async create(payload: Partial<Unit>) {
    const { data } = await api.post(
      "/v1/admin/units",
      payload
    );

    return data;
  }

  /**
   * Update Unit
   */
  async update(uuid: string, payload: Partial<Unit>) {
    const { data } = await api.put(
      `/v1/admin/units/${uuid}`,
      payload
    );

    return data;
  }

  /**
   * Delete Unit
   */
  async delete(uuid: string) {
    const { data } = await api.delete(
      `/v1/admin/units/${uuid}`
    );

    return data;
  }

  /**
   * Toggle Status
   */
  async toggleStatus(uuid: string) {
    const { data } = await api.patch(
      `/v1/admin/units/${uuid}/toggle-status`
    );

    return data;
  }

  /**
   * Restore Unit
   */
  async restore(uuid: string) {
    const { data } = await api.patch(
      `/v1/admin/units/${uuid}/restore`
    );

    return data;
  }

  /**
   * Force Delete
   */
  async forceDelete(uuid: string) {
    const { data } = await api.delete(
      `/v1/admin/units/${uuid}/force-delete`
    );

    return data;
  }

  /**
   * Unit Lookup
   */
  async lookup() {
    const { data } = await api.get(
      "/lookups/units"
    );

    return data.data;
  }
}

export default new UnitService();
