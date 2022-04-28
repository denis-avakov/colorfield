import { useState, useEffect } from 'react';
import { RemoveEmpty, EmojiPuzzled } from 'iconoir-react';
import { isEmpty } from 'lodash';
import useCartProducts from 'hooks/useCartProducts';
import Layout from 'components/Layout';

export default function Cart() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartProductsQuantity, setCartProductsQuantity] = useState<number>(0);
  const [cartProductsPrice, setCartProductsPrice] = useState<number>(0);
  const [cartProducts, setCartProducts] = useCartProducts();

  useEffect(() => {
    const calcQuantity = (acc: number, product: any) => acc + product.quantity;
    const calcPrice = (acc: number, product: any) => acc + product.price * product.quantity;
    const products = Object.values(cartProducts);

    setCartProductsQuantity(products.reduce(calcQuantity, 0));
    setCartProductsPrice(products.reduce(calcPrice, 0));
  }, [cartProducts]);

  const removeProductById = (id: string) => {
    const newCartProducts = {
      ...cartProducts
    };

    delete newCartProducts[id];
    setCartProducts(newCartProducts);
  };

  return (
    <Layout title="Оформление заказа – COLORFIELD">
      <h1 className="mb-8 text-3xl font-medium">Оформление заказа</h1>

      {isEmpty(cartProducts) ? (
        <p className="flex items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 p-4 text-center font-medium text-zinc-500">
          <span>В корзине пока пусто</span>
          <EmojiPuzzled className="ml-3 h-8 w-8" strokeWidth={1.2} />
        </p>
      ) : (
        <ul role="list" className="divide-y-2 divide-gray-200 border-y-4">
          {Object.values(cartProducts).map((product) => (
            <li key={product.id} className="flex items-center justify-between py-3">
              <h3 className="font-medium text-gray-900">
                <span>{product.name}</span>
                <span className="ml-1 text-gray-400">x{product.quantity}</span>
              </h3>

              <div className="flex items-center">
                <p className="text-gray-500">{product.price} руб.</p>

                <button
                  type="button"
                  className="text-gray-400 transition-colors hover:text-gray-700"
                  onClick={() => removeProductById(product.id)}
                >
                  <RemoveEmpty className="ml-3 h-6 w-6" strokeWidth={1.8} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
