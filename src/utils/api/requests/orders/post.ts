import { api } from '@/utils/api/instance';

export interface PostOrderParams {
  fio: string;
  address: string;
  phoneNumber: string;
  products: {
    productId: number;
    count: number;
  }[];
}

export type PostOrderConfig = RequestConfig<PostOrderParams>;

export const postOrder = ({ params, config }: PostOrderConfig) =>
  api.post<never, ApiResponse<null>>('/Orders/order', params, config);
