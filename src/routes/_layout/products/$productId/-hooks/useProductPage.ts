import { getRouteApi } from '@tanstack/react-router';

import { useGetProductQuery } from '@/src/utils/api/hooks';
import { useCart } from '@/src/utils/contexts';

const routeApi = getRouteApi('/_layout/products/$productId/');

export const useProductPage = () => {
  const { productId } = routeApi.useParams();

  const cart = useCart();

  const getProductQuery = useGetProductQuery({ id: Number(productId) });

  const product = getProductQuery?.data?.success && getProductQuery.data.data;

  const onAddProductToCart = () => {
    if (!product) return;

    cart.set([...(cart.value ? cart.value : []), product]);
  };

  return {
    state: {
      loading: getProductQuery.isLoading,
      product
    },
    functions: {
      onAddProductToCart
    }
  };
};
