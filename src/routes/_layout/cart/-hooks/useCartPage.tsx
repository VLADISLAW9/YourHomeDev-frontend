import { zodResolver } from '@hookform/resolvers/zod';
import { notifications } from '@mantine/notifications';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import { usePostOrderMutation } from '@/src/utils/api/hooks';
import { ROUTES } from '@/src/utils/constants';
import { useCart } from '@/utils/contexts';

import type { OrderFormSchema } from '../-constants';

import { orderFormSchema } from '../-constants';

export const useCartPage = () => {
  const navigate = useNavigate();

  const cart = useCart();

  const postOrderMutation = usePostOrderMutation();

  const orderForm = useForm<OrderFormSchema>({
    resolver: zodResolver(orderFormSchema)
  });

  const navigateToProduct = (productId: number) => {
    navigate({ to: `${ROUTES.PRODUCTS}/${productId}` });
  };

  const onRemoveProduct = (productId: number) => {
    cart.set(cart!.value!.filter((product) => product.id !== productId));
  };
  const getCountDuplicatesProduct = (productId: number) => {
    return cart.value?.reduce((acc, product) => {
      if (product.id === productId) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  const onAddProductToCart = (product: Product) => {
    cart.set([...(cart.value ? cart.value : []), product]);
  };

  const onRemoveSingleDuplicateProduct = (productId: number) => {
    const indexToRemove = cart.value?.findIndex(
      (product, index, self) =>
        product.id === productId && self.slice(0, index).some((p) => p.id === productId)
    );
    if (indexToRemove !== undefined && indexToRemove !== -1) {
      cart.set(cart.value!.filter((_, index) => index !== indexToRemove));
    }
  };

  const onSubmitOrderForm = orderForm.handleSubmit(async (data) => {
    const products =
      cart.value
        ?.map(({ id }) => ({
          productId: id,
          count: getCountDuplicatesProduct(id) ?? 1
        }))
        .filter(
          (value, index, self) =>
            index ===
            self.findIndex((t) => t.productId === value.productId && t.count === value.count)
        ) ?? [];

    const responsePostOrderMutation = await postOrderMutation.mutateAsync({
      params: {
        ...data,
        products
      }
    });

    if (!responsePostOrderMutation.success) {
      return notifications.show({
        color: 'red',
        message: 'Произошла непредвиденная ошибка, попробуйте еще раз'
      });
    }

    notifications.show({
      color: 'green',
      message: 'Заказ успешно оформлен'
    });

    navigate({ to: ROUTES.INDEX });

    cart.set([]);
  });

  const totalCartPrice =
    !!cart.value?.length && cart.value.reduce((acc, { price }) => acc + price, 0);

  return {
    form: orderForm,
    state: {
      cart: cart.value
        ? cart.value.filter(
            (product, index, self) => self.findIndex((p) => p.id === product.id) === index
          )
        : [],
      totalCartPrice,
      loading: postOrderMutation.isPending
    },
    functions: {
      onSubmitOrderForm,
      navigateToProduct,
      onRemoveProduct,
      getCountDuplicatesProduct,
      onAddProductToCart,
      onRemoveSingleDuplicateProduct
    }
  };
};
