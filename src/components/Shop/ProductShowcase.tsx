import { useState, useEffect } from 'react';
import useCartProducts from 'hooks/useCartProducts';
import type { ProductProps } from 'utils/types';

import Carousel from 'components/Carousel';
import CarouselSlide from 'components/CarouselSlide';

export default function ProductShowcase(currentProduct: ProductProps) {
  const [cartProductsQuantity, setCartProductsQuantity] = useState<number>(0);
  const [cartProducts, setCartProducts] = useCartProducts();

  useEffect(() => {
    setCartProductsQuantity(cartProducts[currentProduct.id]?.quantity);
  }, [cartProducts, currentProduct.id]);

  const addProductToCart = () => {
    if (cartProducts[currentProduct.id]) {
      setCartProducts({
        ...cartProducts,
        [currentProduct.id]: {
          ...currentProduct,
          quantity: cartProducts[currentProduct.id].quantity + 1
        }
      });
    } else {
      setCartProducts({
        ...cartProducts,
        [currentProduct.id]: {
          ...currentProduct,
          quantity: 1
        }
      });
    }
  };

  return (
    <div className="relative w-full max-w-xs overflow-hidden rounded-lg bg-white">
      <Carousel
        slides={currentProduct.images.map((image) => (
          <CarouselSlide key={image.id} className="h-[250px] w-[320px]" {...image} />
        ))}
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold">{currentProduct.name}</h3>
        <ul className="mt-2 list-none text-sm">
          {currentProduct.features.map((feature, key) => (
            <li key={key}>{feature}</li>
          ))}
        </ul>

        <div className="mt-3 flex items-center justify-start space-x-1 text-slate-700">
          <span className="text-2xl font-bold tracking-tighter">{currentProduct.price}</span>
          <span className="font-medium">₽</span>
        </div>

        <button
          type="button"
          className="button-flat relative mt-4 w-full py-2.5"
          onClick={() => addProductToCart()}
        >
          {cartProductsQuantity > 0 && (
            <div className="absolute right-0 -top-[14px]">
              <span className="rounded-full bg-green-200 py-0.5 px-2 text-sm">
                {cartProductsQuantity} шт
              </span>
            </div>
          )}

          <span>Добавить в корзину</span>
        </button>
      </div>
    </div>
  );
}
