import type { ReactNode } from 'react';

import { useMemo, useState } from 'react';

import { CartContext } from './CartContext';

export interface CartProviderProps {
  children: ReactNode;
  initialCart?: any;
}

export const CartProvider = ({ children, initialCart }: CartProviderProps) => {
  const [cart, setCart] = useState(initialCart);

  const value = useMemo(() => ({ value: cart, set: setCart }), [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
