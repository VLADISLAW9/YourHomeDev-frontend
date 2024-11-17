import { api } from '@/utils/api/instance';

export type GetProductsConfig = RequestConfig;

export const getProducts = (params?: GetProductsConfig) =>
  api.get<never, ApiResponse<Product[]>>('/Products', params?.config);
