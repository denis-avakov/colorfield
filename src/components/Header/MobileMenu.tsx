import { useState } from 'react';
import { Cancel, Menu } from 'iconoir-react';
import { size } from 'lodash';
import useCartProducts from 'hooks/useCartProducts';

import { DialogContent } from 'components/DialogContent';
import MobileMenuItem from 'components/Header/MobileMenuItem';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartProducts] = useCartProducts();

  return (
    <>
      <button
        type="button"
        className="action p-2 md:hidden"
        onClick={() => setIsOpen((state) => !state)}
      >
        {isOpen ? (
          <>
            <span className="sr-only">Закрыть меню</span>
            <Cancel className="h-7 w-7 stroke-zinc-50" />
          </>
        ) : (
          <>
            <span className="sr-only">Открыть меню</span>
            <Menu className="h-7 w-7 stroke-zinc-50" />
          </>
        )}
      </button>

      <DialogContent isOpen={isOpen} onClose={() => setIsOpen(false)} title="Меню">
        <ul className="-my-4 divide-y text-center">
          <MobileMenuItem href="/products" text="Каталог" />
          <MobileMenuItem href="/editor-intro" text="Редактор" />
          <MobileMenuItem href="/about-us" text="О нас" />
          <MobileMenuItem href="/contacts" text="Контакты" />
          <MobileMenuItem href="/cart" text={`Корзина (${size(cartProducts)})`} />
        </ul>
      </DialogContent>
    </>
  );
}
