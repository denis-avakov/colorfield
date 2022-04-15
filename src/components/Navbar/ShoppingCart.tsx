import { Fragment } from 'react';
import { useLocalStorage } from 'react-use';
import Image from 'next/image';
import { Popover, Transition } from '@headlessui/react';
import { ShoppingBag, EmojiPuzzled } from 'iconoir-react';
import classNames from 'classnames/dedupe';
import type { ReactNode } from 'react';

type ProductProps = {
  id: string | number;
  href: string;
  name: string;
  price: string | number;
  quantity: string | number;
  preview: {
    src: string;
    alt: string;
  };
};

function Badge(props: { children: ReactNode }) {
  return (
    <div className="absolute bottom-0.5 right-1.5">
      <span className="bg-zinc-700 px-1 py-0.5 text-xs font-medium">{props.children}</span>
    </div>
  );
}

export default function ShoppingCart(props: { className?: string }) {
  const [products] = useLocalStorage<any[]>('shopping-cart', []);

  return (
    <Popover className={classNames('relative hidden items-center md:flex', props.className)}>
      <Popover.Button className="action relative overflow-hidden pt-1.5 pb-2 pl-2">
        <ShoppingBag className="mr-2 h-8 w-8" />
        <Badge>{products?.length || 0}</Badge>
        <span className="sr-only">items in cart, view bag</span>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="ease-out duration-200"
        enterFrom="opacity-0 scale-105"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-105"
      >
        <Popover.Panel className="absolute inset-x-0 top-full left-auto right-0 z-50 -mr-2 mt-2 w-80 rounded-lg bg-white px-4 py-4 text-zinc-700 shadow-lg ring-1 ring-black ring-opacity-5">
          {products?.length && products.length >= 1 ? (
            <ul role="list" className="-mt-6 divide-y divide-gray-200">
              {products.map((product: ProductProps) => (
                <li key={product.id} className="flex py-6">
                  <div className="relative h-16 w-16 flex-none overflow-hidden rounded-md border border-gray-200">
                    <Image
                      src={product.preview.src}
                      alt={product.preview.alt}
                      objectFit="cover"
                      objectPosition="center"
                      layout="fill"
                    />
                  </div>

                  <div className="ml-4 flex flex-col justify-center">
                    <h3 className="font-medium text-gray-900">
                      <a href={product.href}>{product.name}</a>
                    </h3>

                    <p className="text-gray-500">{product.price} руб.</p>
                  </div>
                </li>
              ))}

              <li className="pt-6">
                <button className="button-primary w-full">Оформление заказа</button>
              </li>
            </ul>
          ) : (
            <>
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 p-4 text-center font-medium text-zinc-500">
                В корзине пока пусто <EmojiPuzzled className="ml-2 h-8 w-8" strokeWidth={1.2} />
              </div>

              <button className="button-secondary mt-4 w-full">Перейти в каталог</button>
            </>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
