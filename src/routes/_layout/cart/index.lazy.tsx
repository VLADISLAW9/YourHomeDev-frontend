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
import { Controller } from 'react-hook-form';
import { LuMinus, LuPlus, LuTrash } from 'react-icons/lu';
import { PatternFormat } from 'react-number-format';

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
        <Card withBorder h='70vh' padding='lg' radius='md' shadow='sm' w='60%'>
          {!state.cart?.length && (
            <Center h='100%'>
              <Text c='dimmed' size='xl'>
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
                      gap='xs'
                      style={{ cursor: 'pointer' }}
                      onClick={() => functions.navigateToProduct(product.id)}
                    >
                      <Image alt={product.name} radius='md' src={product.image} w={120} />
                      <Stack gap={5}>
                        <Text size='xl'>{product.name}</Text>
                        <Text c='dimmed' lineClamp={1} size='xs' w={300}>
                          {product.description}
                        </Text>
                        <ActionIcon
                          variant='subtle'
                          onClick={(event) => {
                            event.stopPropagation();
                            functions.onRemoveProduct(product.id);
                          }}
                        >
                          <LuTrash />
                        </ActionIcon>
                      </Stack>
                    </Flex>
                    <Group>
                      <ActionIcon
                        disabled={functions.getCountDuplicatesProduct(product.id) === 1}
                        variant='outline'
                        onClick={() => functions.onRemoveSingleDuplicateProduct(product.id)}
                      >
                        <LuMinus />
                      </ActionIcon>
                      <Text size='xl'>{functions.getCountDuplicatesProduct(product.id)}</Text>
                      <ActionIcon
                        variant='outline'
                        onClick={() => functions.onAddProductToCart(product)}
                      >
                        <LuPlus />
                      </ActionIcon>
                    </Group>
                    <Text fw={700} size='xl'>
                      {product.price} ₽
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </ScrollArea>
          )}
        </Card>
        <Card withBorder h='50vh' padding='lg' pos='relative' radius='md' shadow='sm' w='40%'>
          <LoadingOverlay
            overlayProps={{ radius: 'sm', blur: 2 }}
            visible={state.loading}
            zIndex={1000}
          />
          <Title mb={30} order={2} size='h3'>
            Оформить заказ
          </Title>
          <form style={{ height: '100%' }} onSubmit={functions.onSubmitOrderForm}>
            <Stack h='100%' justify='space-between'>
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
                  render={({ field: { onChange, value, ...field }, fieldState }) => (
                    <Input
                      {...field}
                      component={PatternFormat}
                      disabled={!state.cart?.length}
                      format='+7 ### ### ## ##'
                      placeholder='Введите номер телефона'
                      size='md'
                      onChange={(event) =>
                        onChange(event.target.value.replace('+', '').replace(/ /g, ''))
                      }
                      {...(fieldState.error && {
                        error: fieldState.error.message
                      })}
                    />
                  )}
                  control={form.control}
                  name='phoneNumber'
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
                <Button disabled={!state.cart?.length} size='lg' type='submit'>
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
