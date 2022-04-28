import Link from 'next/link';
import { FastArrowRight } from 'iconoir-react';
import Layout from 'components/Layout';

export default function NotFound() {
  return (
    <Layout
      title="404 – COLORFIELD"
      className="flex flex-col items-center justify-center space-y-4"
    >
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
        404 – СТРАНИЦА НЕ НАЙДЕНА
      </h1>

      <Link href="/">
        <a className="button-primary flex items-center py-4 px-8 text-2xl">
          Вернуться на главную <FastArrowRight className="ml-2 h-12 w-12" />
        </a>
      </Link>
    </Layout>
  );
}
