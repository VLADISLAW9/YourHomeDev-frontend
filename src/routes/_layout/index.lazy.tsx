import { LuSearch } from 'react-icons/lu';
import { Card, Center, SimpleGrid, Stack, Text, TextInput, Title } from '@mantine/core';
import { createLazyFileRoute } from '@tanstack/react-router';

import { PageLoader } from '@/src/components';

import { ProductItem } from './-components';
import { useIndexPage } from './-hooks';

const IndexPage = () => {
  const { state, functions } = useIndexPage();

  return (
    <Stack gap='xl'>
      <Card h={400} bg='dark.9' shadow='sm' padding='lg' radius='md' withBorder>
        <Center h='100%'>
          <Text
            size='60px'
            fw={900}
            variant='gradient'
            gradient={{ from: 'white', to: 'dark', deg: 90 }}
          >
            Все для вас <br /> и вашего дома
          </Text>
        </Center>
      </Card>
      <Title order={1} size='h2'>
        Каталог
      </Title>
      <TextInput
        value={state.search}
        onChange={(event) => functions.handleSearch(event.target.value)}
        leftSection={<LuSearch />}
        size='md'
        placeholder='Поиск...'
      />
      {!state.products.length && (
        <Center h='50vh'>
          <Text size='xl' c='dimmed'>
            Ничего не найдено
          </Text>
        </Center>
      )}
      {!!state.products.length && (
        <SimpleGrid cols={5}>
          {state.products.map((product) => (
            <ProductItem
              product={product}
              onAddProductToCart={functions.onAddProductToCart}
              key={product.id}
            />
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
};

export const Route = createLazyFileRoute('/_layout/')({
  component: IndexPage,
  pendingComponent: PageLoader
});
