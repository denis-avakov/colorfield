import { useState, useEffect } from 'react';
import { ShoppingBag, EmojiPuzzled } from 'iconoir-react';
import { isEmpty } from 'lodash';

import useCartProducts from 'hooks/useCartProducts';
import classNames from 'utils/classNames';

import ButtonLink from 'components/ButtonLink';
import Badge from 'components/Header/ShoppingCart/Badge';
import ProductRow from 'components/Header/ShoppingCart/ProductRow';
import { SidebarDialogContent } from 'components/DialogContent';

type ShoppingCartProps = {
  className?: string;
};

export default function ShoppingCart(props: ShoppingCartProps) {
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
    <>
      <div className={classNames('relative hidden items-center md:flex', props.className)}>
        <button
          type="button"
          className="focus active relative overflow-hidden pt-1.5 pb-2 pl-2 hover:text-violet-300"
          onClick={() => setIsOpen(true)}
        >
          <ShoppingBag className="mr-2 h-8 w-8" />
          <Badge>{cartProductsQuantity}</Badge>
        </button>
      </div>

      <SidebarDialogContent
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Корзина"
        classNameWrapper={!isEmpty(cartProducts) && 'max-w-md'}
      >
        {isEmpty(cartProducts) ? (
          <>
            <p className="flex items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 p-4 text-center font-medium text-zinc-500">
              <span>В корзине пока пусто</span>
              <EmojiPuzzled className="ml-3 h-8 w-8" strokeWidth={1.2} />
            </p>

            <div className="mt-4">
              <button
                type="button"
                className="action inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => setIsOpen(false)}
              >
                Понял, спасибо!
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-5">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Товаров на {Intl.NumberFormat('ru-RU').format(cartProductsPrice)} руб.
            </h3>

            <ul role="list" className="divide-y-2 divide-gray-200 border-y-4">
              {Object.values(cartProducts).map((product) => (
                <ProductRow key={product.id} {...product} onRemove={removeProductById} />
              ))}
            </ul>

            <ButtonLink href="/cart" buttonType="primary-outline">
              Оформить заказ
            </ButtonLink>
          </div>
        )}
      </SidebarDialogContent>
    </>
  );
}
