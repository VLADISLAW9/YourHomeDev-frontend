import { useNavigate } from '@tanstack/react-router';

import { useCart } from '@/src/utils/contexts';
import { ROUTES } from '@/utils/constants';

export const useHeader = () => {
  const navigate = useNavigate();

  const cart = useCart();

  const navigateToIndex = () => {
    navigate({ to: ROUTES.INDEX });
  };

  const navigateToCart = () => {
    navigate({ to: ROUTES.CART });
  };

  return {
    state: { cart: cart.value },
    functions: { navigateToIndex, navigateToCart }
  };
};
