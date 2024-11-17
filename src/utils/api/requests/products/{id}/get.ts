import { api } from '@/utils/api/instance';

export interface GetProductParams {
  id: number;
}

export type GetProductConfig = RequestConfig<GetProductParams>;

export const getProduct = ({ params: { id }, config }: GetProductConfig) =>
  api.get<never, ApiResponse<Product>>(`/Products/${id}`, config);
