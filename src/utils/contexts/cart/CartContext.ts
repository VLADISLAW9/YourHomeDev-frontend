import { createContext } from 'react';

export interface CartContextProps {
  value?: Product[];
  set: (cart: Product[]) => void;
}

export const CartContext = createContext<CartContextProps>({
  value: undefined,
  set: () => {}
});
