import { AppShell } from '@mantine/core';
import { Outlet } from '@tanstack/react-router';

import { Header } from './components/Header/Header';

export const Layout = () => (
  <AppShell px={250} py={50} header={{ height: 100 }} footer={{ height: 100 }}>
    <Header />
    <AppShell.Main>
      <Outlet />
    </AppShell.Main>
  </AppShell>
);
