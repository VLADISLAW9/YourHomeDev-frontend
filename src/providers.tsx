import type { MantineProviderProps } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { QueryClientProviderProps } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from '@tanstack/react-router';

import type { CartProviderProps } from '@/utils/contexts/cart';
import { CartProvider } from '@/utils/contexts/cart';

export interface ProvidersProps {
  children: ReactNode;
  mantine: Omit<MantineProviderProps, 'children'>;
  query: Omit<QueryClientProviderProps, 'children'>;
  cart: Omit<CartProviderProps, 'children'>;
}

export const Providers = ({ children, query, mantine, cart }: ProvidersProps) => {
  return (
    <MantineProvider {...mantine}>
      <QueryClientProvider {...query}>
        <CartProvider {...cart}>
          <Notifications />
          {children}
        </CartProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};
