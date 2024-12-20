import { Button, Card, Flex, Image, Stack, Text, Title } from '@mantine/core';
import { createLazyFileRoute } from '@tanstack/react-router';
import { LuShoppingCart } from 'react-icons/lu';

import { PageLoader } from '@/src/components';

import { useProductPage } from './-hooks/useProductPage';

const ProductPage = () => {
  const { state, functions } = useProductPage();

  if (!state.product) return <div>404</div>;

  return (
    <Flex justify='space-between'>
      <Image alt={state.product.name} h={400} radius='lg' src={state.product.image} w={800} />
      <Stack ml={100} style={{ flex: 1 }}>
        <Title>{state.product.name}</Title>
        <Text c='dimmed'>{state.product.description ?? 'Нет описания'}</Text>
      </Stack>
      <Stack>
        <Card
          withBorder
          h='100%'
          padding='lg'
          radius='md'
          shadow='sm'
          style={{ cursor: 'pointer' }}
          w={320}
        >
          <Stack h='100%' justify='space-between'>
            <Title>{state.product.price} ₽</Title>
            <Stack mt={30} style={{ flex: 1 }}>
              <Text c='dimmed' size='sm'>
                Количество: {state.product.count}
              </Text>
              <Text c='dimmed' size='sm'>
                Дата создания: {state.product.created}
              </Text>
              <Text c='dimmed' size='sm'>
                Дата обновления: {state.product.updated}
              </Text>
            </Stack>
            <Button
              leftSection={<LuShoppingCart size={25} />}
              size='lg'
              onClick={functions.onAddProductToCart}
            >
              Добавить в корзину
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Flex>
  );
};

export const Route = createLazyFileRoute('/_layout/products/$productId/')({
  component: ProductPage,
  pendingComponent: PageLoader
});
