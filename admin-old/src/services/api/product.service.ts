import api from "./axios";
import { API } from "./endpoints";

export const ProductService = {
  getProducts(params?: any) {
    return api.get(API.PRODUCT.LIST, {
      params,
    });
  },

  createProduct(data: any) {
    return api.post(
      API.PRODUCT.CREATE,
      data
    );
  },
};