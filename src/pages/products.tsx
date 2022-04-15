import Link from 'next/link';
import { FastArrowRight } from 'iconoir-react';
import Container from 'components/Container';

export default function Products() {
  return (
    <Container title="404 – COLORFIELD">
      <h2 className="sr-only">Products</h2>

      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
        <div className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="aspect-w-3 aspect-h-4 bg-gray-200 sm:aspect-none sm:h-96">
            <div className="h-full w-full object-cover object-center sm:h-full sm:w-full"></div>
          </div>

          <div className="flex flex-1 flex-col space-y-2 p-4">
            <h3 className="text-sm font-medium text-gray-900">
              <span className="inline-flex items-center rounded bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-800">
                <svg
                  className="mr-1.5 h-2 w-2 text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <circle cx={4} cy={4} r={3} />
                </svg>
                В наличии
              </span>
            </h3>

            <p className="text-sm text-gray-500">Цветовая гамма: монохромная</p>
            <p className="text-sm text-gray-500">Количество цветов: 50</p>
            <p className="text-sm text-gray-500">Размер: СЕЛЕКТОР</p>

            <div className="flex flex-1 flex-col justify-end">
              <p className="text-base font-medium text-gray-900">2000 руб.</p>
            </div>
          </div>

          <a href="#" className="button-secondary m-4 mt-0 bg-zinc-400 text-center text-xl">
            Добавить в корзину
          </a>
        </div>

        <div className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="aspect-w-3 aspect-h-4 bg-gray-200 sm:aspect-none sm:h-96">
            <div className="h-full w-full object-cover object-center sm:h-full sm:w-full"></div>
          </div>

          <div className="flex flex-1 flex-col space-y-2 p-4">
            <h3 className="text-sm font-medium text-gray-900">
              <span className="inline-flex items-center rounded bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800">
                <svg className="mr-1.5 h-2 w-2 text-red-400" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx={4} cy={4} r={3} />
                </svg>
                Нет в наличии
              </span>
            </h3>

            <p className="text-sm text-gray-500">Тип: холст</p>
            <p className="text-sm text-gray-500">Размер: СЕЛЕКТОР</p>

            <div className="flex flex-1 flex-col justify-end">
              <p className="text-base font-medium text-gray-900">5000 руб.</p>
            </div>
          </div>

          <a
            href="#"
            className="button-secondary m-4 mt-0 bg-zinc-400 text-center text-xl hover:cursor-not-allowed"
          >
            Добавить в корзину
          </a>
        </div>
      </div>
    </Container>
  );
}
