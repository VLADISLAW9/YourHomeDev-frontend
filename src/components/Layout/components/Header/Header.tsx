import { LuShoppingCart } from 'react-icons/lu';
import { TbCandle } from 'react-icons/tb';
import { ActionIcon, AppShell, Group, Indicator, Text } from '@mantine/core';

import { useHeader } from './hooks/useHeader';

export const Header = () => {
  const { functions, state } = useHeader();

  return (
    <AppShell.Header px={250} py={30}>
      <Group justify='space-between'>
        <Group style={{ cursor: 'pointer' }} onClick={functions.navigateToIndex} gap='xs'>
          <TbCandle size={40} />
          <Text fw={700}>YOUR HOME</Text>
        </Group>
        <Indicator p={2} inline disabled={!state.cart?.length} size='lg' label={state.cart?.length}>
          <ActionIcon onClick={functions.navigateToCart} variant='white'>
            <LuShoppingCart size={40} />
          </ActionIcon>
        </Indicator>
      </Group>
    </AppShell.Header>
  );
};
