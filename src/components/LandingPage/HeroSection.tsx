import classNames from 'classnames';
import Link from 'next/link';
import { FastArrowRight } from 'iconoir-react';
import Preview from 'components/Preview';

export default function HeroSection(props: { className?: string }) {
  return (
    <div className={classNames('relative', props.className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 -mx-4 rounded-bl-lg rounded-br-lg bg-zinc-200 md:-mx-8"
      />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-extrabold uppercase tracking-tight text-zinc-800 md:text-4xl">
            <span className="mr-2 md:flex">Стань новым Давинчи</span>
            <span>с картинами от Colorfield</span>
          </h1>

          <p className="mt-4 text-lg text-zinc-600">
            Просто выбери свою любимую фотографию и собери по ней уникальную картину по номерам!
          </p>

          <div className="mt-14">
            <Link href="/">
              <a className="button-primary inline-block w-full py-4 px-10 text-xl focus:ring-offset-zinc-200 lg:w-auto">
                <div className="flex-center">
                  <span>Перейти к созданию картины</span>
                  <FastArrowRight className="ml-2 mt-1 h-12 w-12" />
                </div>
              </a>
            </Link>
          </div>
        </div>

        <Preview
          className="aspect-w-2 aspect-h-1 w-full ring-offset-zinc-200 lg:w-1/2"
          href="/"
          title="Бесплатный показ"
          subtitle="Позволит оценить будущую картину до совершения реальной покупки 👀"
          src="/static/images/shopping-cart-product-01.jpg"
          alt="123"
        />
      </div>
    </div>
  );
}
