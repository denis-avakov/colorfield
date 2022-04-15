import { useState } from 'react';
import { useLocalStorage } from 'react-use';
import { Cancel, Menu } from 'iconoir-react';
import DialogContent from 'components/DialogContent';
import Link from 'components/Link';

export default function MobileMenu() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [products] = useLocalStorage<any[]>('shopping-cart', []);

  return (
    <>
      <button
        type="button"
        className="action p-2 md:hidden"
        onClick={() => setMenuOpen((state) => !state)}
      >
        {isMenuOpen ? (
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

      <DialogContent isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} title="Меню">
        <ul className="-my-4 divide-y text-center">
          <li className="flex items-center justify-between py-3">
            <Link href="/products" className="w-full px-4 py-2 text-xl font-medium text-indigo-600">
              Каталог
            </Link>
          </li>

          <li className="flex items-center justify-between py-3">
            <Link href="/about-us" className="w-full px-4 py-2 text-xl font-medium text-indigo-600">
              О COLORFIELD
            </Link>
          </li>

          <li className="flex items-center justify-between py-3">
            <Link href="/cart" className="w-full px-4 py-2 text-xl font-medium text-indigo-600">
              Корзина ({products?.length || 0})
            </Link>
          </li>
        </ul>
      </DialogContent>
    </>
  );
}
