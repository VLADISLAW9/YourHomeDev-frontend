import { useQuery } from '@tanstack/react-query';

import type { GetProductParams } from '@/utils/api';
import { getProduct } from '@/utils/api';

export const useGetProductQuery = (
  params: GetProductParams,
  settings?: QuerySettings<typeof getProduct>
) =>
  useQuery({
    queryKey: ['getProduct'],
    queryFn: () => getProduct({ params, config: settings?.config }),
    ...settings?.options
  });
