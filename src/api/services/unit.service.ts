import api from "../axios";

class UnitService {
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