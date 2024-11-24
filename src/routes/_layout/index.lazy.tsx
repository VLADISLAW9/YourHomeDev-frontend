import {
  BackgroundImage,
  Card,
  Center,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { createLazyFileRoute } from '@tanstack/react-router';
import { LuSearch } from 'react-icons/lu';

import { PageLoader } from '@/src/components';
import HeaderImgSrc from '@/static/images/yourhomeheader.jpg';

import { ProductItem } from './-components';
import { useIndexPage } from './-hooks';

const IndexPage = () => {
  const { state, functions } = useIndexPage();

  return (
    <Stack gap='xl'>
      <Card
        bg='dark.9'
        h={400}
        left={0}
        padding='lg'
        pos='absolute'
        radius='none'
        shadow='sm'
        top={50}
        w='100%'
      >
        <Center h='100%'>
          <Group gap={350}>
            <Text
              fw={900}
              gradient={{ from: 'white', to: 'dark', deg: 90 }}
              size='60px'
              variant='gradient'
            >
              Все для вас <br /> и вашего дома
            </Text>
            <BackgroundImage h={300} radius='100%' src={HeaderImgSrc} w={300} />
          </Group>
        </Center>
      </Card>
      <Title mt={350} order={1} size='h2'>
        Каталог
      </Title>
      <TextInput
        leftSection={<LuSearch />}
        placeholder='Поиск...'
        size='md'
        value={state.search}
        onChange={(event) => functions.handleSearch(event.target.value)}
      />
      {!state.products.length && (
        <Center h='50vh'>
          <Text c='dimmed' size='xl'>
            Ничего не найдено
          </Text>
        </Center>
      )}
      {!!state.products.length && (
        <SimpleGrid cols={5}>
          {state.products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onAddProductToCart={functions.onAddProductToCart}
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
