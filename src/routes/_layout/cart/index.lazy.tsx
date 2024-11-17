import { Controller } from 'react-hook-form';
import { LuMinus, LuPlus, LuTrash } from 'react-icons/lu';
import { PatternFormat } from 'react-number-format';
import {
  ActionIcon,
  Button,
  Card,
  Center,
  Flex,
  Group,
  Image,
  Input,
  LoadingOverlay,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { createLazyFileRoute } from '@tanstack/react-router';

import { PageLoader } from '@/src/components';

import { useCartPage } from './-hooks';

const CartPage = () => {
  const { form, state, functions } = useCartPage();

  return (
    <Stack gap='xl'>
      <Title order={1} size='h2'>
        Корзина
      </Title>
      <Flex gap={100}>
        <Card w='60%' h='70vh' shadow='sm' padding='lg' radius='md' withBorder>
          {!state.cart?.length && (
            <Center h='100%'>
              <Text size='xl' c='dimmed'>
                Корзина пуста
              </Text>
            </Center>
          )}
          {!!state.cart?.length && (
            <ScrollArea pr={30}>
              <Stack gap='xl'>
                {state.cart.map((product) => (
                  <Flex key={product.id} align='center' justify='space-between'>
                    <Flex
                      style={{ cursor: 'pointer' }}
                      onClick={() => functions.navigateToProduct(product.id)}
                      gap='xs'
                    >
                      <Image radius='md' src={product.image} w={120} alt={product.name} />
                      <Stack gap={5}>
                        <Text size='xl'>{product.name}</Text>
                        <Text c='dimmed' size='xs' lineClamp={1} w={300}>
                          {product.description}
                        </Text>
                        <ActionIcon
                          onClick={(event) => {
                            event.stopPropagation();
                            functions.onRemoveProduct(product.id);
                          }}
                          variant='subtle'
                        >
                          <LuTrash />
                        </ActionIcon>
                      </Stack>
                    </Flex>
                    <Group>
                      <ActionIcon
                        onClick={() => functions.onRemoveSingleDuplicateProduct(product.id)}
                        disabled={functions.getCountDuplicatesProduct(product.id) === 1}
                        variant='outline'
                      >
                        <LuMinus />
                      </ActionIcon>
                      <Text size='xl'>{functions.getCountDuplicatesProduct(product.id)}</Text>
                      <ActionIcon
                        onClick={() => functions.onAddProductToCart(product)}
                        variant='outline'
                      >
                        <LuPlus />
                      </ActionIcon>
                    </Group>
                    <Text size='xl' fw={700}>
                      {product.price} ₽
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </ScrollArea>
          )}
        </Card>
        <Card pos='relative' w='40%' h='50vh' shadow='sm' padding='lg' radius='md' withBorder>
          <LoadingOverlay
            visible={state.loading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />
          <Title mb={30} order={2} size='h3'>
            Оформить заказ
          </Title>
          <form onSubmit={functions.onSubmitOrderForm} style={{ height: '100%' }}>
            <Stack justify='space-between' h='100%'>
              <Stack gap='xl'>
                <TextInput
                  {...form.register('fio')}
                  disabled={!state.cart?.length}
                  placeholder='Введите ФИО'
                  size='md'
                  {...(form.formState.errors.fio && {
                    error: form.formState.errors.fio.message
                  })}
                />
                <Controller
                  name='phoneNumber'
                  control={form.control}
                  render={({ field: { onChange, value, ...field }, fieldState }) => (
                    <Input
                      {...field}
                      disabled={!state.cart?.length}
                      size='md'
                      component={PatternFormat}
                      format='+7 ### ### ## ##'
                      onChange={(event) =>
                        onChange(event.target.value.replace('+', '').replace(/ /g, ''))
                      }
                      placeholder='Введите номер телефона'
                      {...(fieldState.error && {
                        error: fieldState.error.message
                      })}
                    />
                  )}
                />
                <TextInput
                  {...form.register('address')}
                  disabled={!state.cart?.length}
                  placeholder='Введите адрес'
                  size='md'
                  {...(form.formState.errors.address && {
                    error: form.formState.errors.address.message
                  })}
                />
              </Stack>
              <Stack gap='xl'>
                <Group justify='space-between'>
                  <Text size='xl'>Итого:</Text>
                  <Text size='xl'>{state.totalCartPrice} ₽</Text>
                </Group>
                <Button disabled={!state.cart?.length} type='submit' size='lg'>
                  Заказать
                </Button>
              </Stack>
            </Stack>
          </form>
        </Card>
      </Flex>
    </Stack>
  );
};

export const Route = createLazyFileRoute('/_layout/cart/')({
  component: CartPage,
  pendingComponent: PageLoader
});
