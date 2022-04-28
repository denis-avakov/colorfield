import { useLocalStorage } from '@rehooks/local-storage';
import type { ProductProps } from 'utils/types';

type CartProductsProps = {
  [key: string | number]: ProductProps & {
    quantity: number;
  };
};

export default function useCartProducts() {
  return useLocalStorage<CartProductsProps>('shopping-cart', {});
}
