import { useRouter } from 'next/router';
import Head from 'next/head';
import classNames from 'classnames/dedupe';

import Logotype from 'components/Logotype';
import NavItem from 'components/Navbar/NavItem';
import ShoppingCart from 'components/Navbar/ShoppingCart';
import MobileMenu from 'components/Navbar/MobileMenu';

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
        <nav className="wrapper flex w-full items-center justify-between py-4 px-4 md:justify-start md:py-8">
          <Logotype />

          <div className="ml-4 hidden space-x-1 md:flex">
            <NavItem href="/products" text="Каталог" />
            <NavItem href="/about-us" text="О COLORFIELD" />
          </div>

          <ShoppingCart className="grow justify-end" />
          <MobileMenu />
        </nav>
      </header>

      <main className={classNames('wrapper my-8 md:my-16 md:grow', className)}>{children}</main>

      <footer className="wrapper md:my-16">
        © 2022. Все права защищены. Весь размещенный на сайте товар (изображения и описания) носит
        исключительно информационный характер и не является договором публичной оферты
      </footer>
    </>
  );
}
