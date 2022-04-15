import Link from 'next/link';
import { FastArrowRight } from 'iconoir-react';
import type { NextPage } from 'next';
import Container from 'components/Container';
import HeroSection from 'components/LandingPage/HeroSection';

const Home: NextPage = () => {
  return (
    <Container className="mt-0 md:mt-0">
      <HeroSection className="py-16" />

      <h3 className="mt-12 text-center text-2xl font-semibold">
        Узнай всего за пару минут как превратить свою фотографию в эскиз картины по номерам
      </h3>

      <div className="relative mt-4 w-full sm:mx-auto lg:col-span-6 lg:mx-0 lg:flex lg:items-center">
        <div className="relative mx-auto w-full rounded-lg shadow-lg">
          <button
            type="button"
            className="relative block w-full overflow-hidden rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="sr-only">Watch our video to learn more</span>
            <div className="min-h-[30rem] w-full bg-zinc-400"></div>
            <div
              className="absolute inset-0 flex h-full w-full items-center justify-center"
              aria-hidden="true"
            >
              <svg className="h-20 w-20 text-indigo-500" fill="currentColor" viewBox="0 0 84 84">
                <circle opacity="0.9" cx={42} cy={42} r={42} fill="white" />
                <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Trending products */}
      <div className="py-16 sm:py-24 lg:py-32">
        <div className="flex items-center justify-between">
          <h2
            id="trending-heading"
            className="text-2xl font-extrabold tracking-tight text-gray-900"
          >
            Подбери свой формат картины и цветовую гамму
          </h2>
        </div>

        <div className="relative mt-8">
          <div className="relative w-full overflow-x-auto">
            <ul
              role="list"
              className="inline-flex space-x-8 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-x-0"
            >
              <li className="inline-flex w-64 flex-col text-center lg:w-auto">
                <div className="group relative">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                    <div className="h-full w-full object-cover object-center group-hover:opacity-75"></div>
                  </div>

                  <div className="mt-6">
                    <p className="mt-1 text-gray-900">Цветовая гамма: монохромная</p>
                    <p className="mt-1 text-gray-900">Количество цветов: 6</p>
                  </div>
                </div>
              </li>

              <li className="inline-flex w-64 flex-col text-center lg:w-auto">
                <div className="group relative">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                    <div className="h-full w-full object-cover object-center group-hover:opacity-75"></div>
                  </div>

                  <div className="mt-6">
                    <p className="mt-1 text-gray-900">Цветовая гамма: аналогичная</p>
                    <p className="mt-1 text-gray-900">Количество цветов: 22</p>
                  </div>
                </div>
              </li>

              <li className="inline-flex w-64 flex-col text-center lg:w-auto">
                <div className="group relative">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                    <div className="h-full w-full object-cover object-center group-hover:opacity-75"></div>
                  </div>

                  <div className="mt-6">
                    <p className="mt-1 text-gray-900">Цветовая гамма: комплементарная</p>
                    <p className="mt-1 text-gray-900">Количество цветов: 10</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-center">
          <Link href="/products">
            <a className="button-primary mt-16 inline-block w-full py-4 px-10 text-xl focus:ring-offset-zinc-200 lg:w-auto">
              <div className="flex-center">
                <span>Перейти в каталог</span>
                <FastArrowRight className="ml-2 mt-1 h-12 w-12" />
              </div>
            </a>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Home;
