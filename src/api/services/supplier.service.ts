import api from "../axios";

class SupplierService {
  /**
   * Supplier Lookup
   */
  async lookup() {
    const { data } = await api.get(
      "/lookups/suppliers"
    );

    return data.data;
  }
}

export default new SupplierService();