import { useRouter } from 'next/router';
import Head from 'next/head';
import classNames from 'utils/classNames';

import Logotype from 'components/Header/Logotype';
import NavItem from 'components/Header/NavItem';
import MobileMenu from 'components/Header/MobileMenu';
import ShoppingCart from 'components/Header/ShoppingCart';

export default function Container({ className, children, ...customMetaTags }: any) {
  const router = useRouter();

  const meta = {
    title: 'COLORFIELD',
    description: 'COLORFIELD — бесконечный фотоконструктор, который можно собрать по любому фото',
    image: 'https://colorfield.vercel.app/static/images/banner.png',
    type: 'website',
    ...customMetaTags
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="none" />
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={`https://colorfield.vercel.app${router.asPath}`} />

        <meta property="og:url" content={`https://colorfield.vercel.app${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="COLORFIELD" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
      </Head>

      <header className="flex items-center bg-zinc-700 text-zinc-50">
        <nav className="wrapper flex items-center justify-between py-4 md:justify-start md:py-8">
          <Logotype className="-ml-4" />

          <div className="hidden md:ml-2 md:flex md:items-center md:space-x-2">
            <NavItem href="/products" text="Каталог" />
            <NavItem href="/editor-intro" text="Редактор" />
            <NavItem href="/about-us" text="О нас" />
            <NavItem href="/contacts" text="Контакты" />
          </div>

          <ShoppingCart className="grow justify-end" />
          <MobileMenu />
        </nav>
      </header>

      <main className={classNames('wrapper my-8 md:grow', className)}>{children}</main>

      <footer className="wrapper mb-8 flex items-center space-x-8 text-zinc-400">
        <span className="w-1/2 text-indigo-400 hover:cursor-pointer hover:text-indigo-600">
          Политика конфиденциальности
        </span>

        <p className="text-sm">
          © 2022. Все права защищены. Весь размещенный на сайте товар (изображения и описания) носит
          исключительно информационный характер и не является договором публичной оферты.
        </p>
      </footer>
    </>
  );
}
