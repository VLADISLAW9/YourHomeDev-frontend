import { LuShoppingCart } from 'react-icons/lu';
import { Button, Card, Image, Text } from '@mantine/core';
import { useNavigate } from '@tanstack/react-router';

import { ROUTES } from '@/src/utils/constants';

interface ProductItemProps {
  product: Product;
  onAddProductToCart: (product: Product) => void;
}

export const ProductItem = ({ product, onAddProductToCart }: ProductItemProps) => {
  const navigate = useNavigate();

  return (
    <Card
      shadow='sm'
      padding='lg'
      radius='md'
      style={{ cursor: 'pointer' }}
      withBorder
      onClick={() => navigate({ to: `${ROUTES.PRODUCTS}/${product.id}` })}
    >
      <Card.Section>
        <Image src={product.image} height={200} alt='Norway' />
      </Card.Section>
      <Text size='xl' fw={600}>
        {product.price} ₽
      </Text>
      <Text size='lg' fw={500}>
        {product.name}
      </Text>
      <Text size='sm' c='dimmed' lineClamp={1}>
        {product.description ?? 'Нет описания'}
      </Text>
      <Button
        leftSection={<LuShoppingCart size={20} />}
        onClick={(event) => {
          event.stopPropagation();
          onAddProductToCart(product);
        }}
        fullWidth
        mt='md'
        radius='md'
      >
        Добавить в корзину
      </Button>
    </Card>
  );
};
