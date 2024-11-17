import { useEffect, useState } from 'react';

import { useGetProductsQuery } from '@/src/utils/api/hooks';
import { useCart } from '@/src/utils/contexts';

export const useIndexPage = () => {
  const cart = useCart();

  const getProductsQuery = useGetProductsQuery();

  const [search, setSearch] = useState('');

  const products = getProductsQuery.data?.success ? getProductsQuery.data.data : [];

  const [productsFiltered, setProductsFiltered] = useState<Product[]>(products);

  const handleSearch = (value: string) => {
    setSearch(value);

    if (!value.length) {
      return setProductsFiltered(products);
    }

    setProductsFiltered(
      products.filter((product) => product.name.toLowerCase().includes(value.toLowerCase()))
    );
  };

  const onAddProductToCart = (product: Product) => {
    cart.set([...(cart.value ? cart.value : []), product]);
  };

  useEffect(() => setProductsFiltered(products), [products]);

  return {
    state: { products: productsFiltered, loading: getProductsQuery.isLoading, search },
    functions: {
      onAddProductToCart,
      handleSearch
    }
  };
};
