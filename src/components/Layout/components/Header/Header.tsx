import { ActionIcon, AppShell, Group, Indicator, Text } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { LuShoppingCart } from 'react-icons/lu';
import { TbCandle } from 'react-icons/tb';

import { ROUTES } from '@/src/utils/constants';

import { useHeader } from './hooks/useHeader';

export const Header = () => {
  const { functions, state } = useHeader();

  return (
    <AppShell.Header bd='none' bg='dark.9' px={250} py={30}>
      <Group justify='space-between'>
        <Group gap='xs' style={{ cursor: 'pointer' }} onClick={functions.navigateToIndex}>
          <TbCandle color='white' size={40} />
          <Text c='white' fw={700}>
            YOUR HOME
          </Text>
        </Group>
        <Group gap='xl' ml={100} style={{ flex: 1 }}>
          <Link
            style={{ textDecoration: 'none', color: 'var(--mantine-color-white)' }}
            to={ROUTES.INDEX}
          >
            <Text fw={600}>Каталог</Text>
          </Link>
          <Link
            style={{ textDecoration: 'none', color: 'var(--mantine-color-white)' }}
            to={ROUTES.ABOUT_US}
          >
            <Text fw={600}>О нас</Text>
          </Link>
        </Group>
        <Indicator inline disabled={!state.cart?.length} label={state.cart?.length} p={2} size='lg'>
          <ActionIcon color='white' variant='transparent' onClick={functions.navigateToCart}>
            <LuShoppingCart size={40} />
          </ActionIcon>
        </Indicator>
      </Group>
    </AppShell.Header>
  );
};
