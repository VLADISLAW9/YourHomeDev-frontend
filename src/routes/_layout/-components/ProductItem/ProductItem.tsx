import { Button, Card, Image, Text } from '@mantine/core';
import { useNavigate } from '@tanstack/react-router';
import { LuShoppingCart } from 'react-icons/lu';

import { ROUTES } from '@/src/utils/constants';

interface ProductItemProps {
  product: Product;
  onAddProductToCart: (product: Product) => void;
}

export const ProductItem = ({ product, onAddProductToCart }: ProductItemProps) => {
  const navigate = useNavigate();

  return (
    <Card
      withBorder
      padding='lg'
      radius='md'
      shadow='sm'
      style={{ cursor: 'pointer' }}
      onClick={() => navigate({ to: `${ROUTES.PRODUCTS}/${product.id}` })}
    >
      <Card.Section>
        <Image alt='Norway' height={200} src={product.image} />
      </Card.Section>
      <Text fw={600} size='xl'>
        {product.price} ₽
      </Text>
      <Text fw={500} size='lg'>
        {product.name}
      </Text>
      <Text c='dimmed' lineClamp={1} size='sm'>
        {product.description ?? 'Нет описания'}
      </Text>
      <Button
        fullWidth
        leftSection={<LuShoppingCart size={20} />}
        mt='md'
        radius='md'
        onClick={(event) => {
          event.stopPropagation();
          onAddProductToCart(product);
        }}
      >
        Добавить в корзину
      </Button>
    </Card>
  );
};
