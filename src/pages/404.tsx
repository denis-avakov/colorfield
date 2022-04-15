import Link from 'next/link';
import { FastArrowRight } from 'iconoir-react';
import Container from 'components/Container';

export default function NotFound() {
  return (
    <Container title="404 – COLORFIELD">
      <div className="mx-auto mb-16 flex flex-col items-start justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          404 – СТРАНИЦА НЕ НАЙДЕНА
        </h1>

        <p className="mb-8 text-gray-600 dark:text-gray-400">СТРАНИЦА НЕ НАЙДЕНА</p>

        <Link href="/">
          <a className="button-primary flex items-center py-4 px-8 text-2xl">
            Вернуться на главную <FastArrowRight className="ml-2 h-12 w-12" />
          </a>
        </Link>
      </div>
    </Container>
  );
}
