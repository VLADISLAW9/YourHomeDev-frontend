import ReactDOM from 'react-dom/client';
import { createTheme } from '@mantine/core';
import { QueryClient } from '@tanstack/react-query';

import type { ProvidersProps } from '@/src/providers';
import { Providers } from '@/src/providers';

import { App } from './App';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

export const init = () => {
  const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement);

  const providersProps: Omit<ProvidersProps, 'children'> = {
    cart: { initialCart: [] },
    query: {
      client: new QueryClient()
    },
    mantine: {
      theme: createTheme({
        fontFamily: 'Roboto, sans-serif',
        primaryColor: 'dark'
      })
    }
  };

  root.render(
    <Providers {...providersProps}>
      <App />
    </Providers>
  );
};

init();
