import { AppShell } from '@mantine/core';
import { Outlet } from '@tanstack/react-router';

import { Header } from './components/Header/Header';

export const Layout = () => (
  <AppShell footer={{ height: 100 }} header={{ height: 100 }} px={250} py={50}>
    <Header />
    <AppShell.Main>
      <Outlet />
    </AppShell.Main>
  </AppShell>
);
