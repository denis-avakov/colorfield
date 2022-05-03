import { ArrowRight } from 'iconoir-react';
import classNames from 'utils/classNames';

import Carousel from 'components/Carousel';
import CarouselSlide from 'components/CarouselSlide';
import ButtonLink from 'components/ButtonLink';

type HeroSectionProps = {
  className?: string;
};

export default function HeroSection(props: HeroSectionProps) {
  return (
    <section
      className={classNames(
        'relative flex flex-col overflow-hidden rounded-lg bg-white lg:flex-row',
        props.className
      )}
    >
      <div className="flex flex-col items-center justify-center p-8 text-center lg:w-[60%] lg:items-start lg:text-left">
        <div className="space-y-3">
          <h1 className="relative z-[1] grid grid-rows-2 text-4xl font-bold lg:whitespace-nowrap">
            <span className="-ml-[1px] text-gray-800">Стань новым Да Винчи</span>
            <span className="text-3xl text-indigo-600">с картинами собранными из лего</span>
          </h1>

          <p className="grid grid-rows-2 text-gray-500 sm:text-lg md:text-xl">
            <span>Просто выбери свою любимую фотографию и</span>
            <span>раскрась по ней уникальную картину по номерам!</span>
          </p>
        </div>

        <div className="mt-4 flex flex-grow items-end">
          <ButtonLink
            href="/editor"
            buttonType="primary-outline"
            className="w-72 space-x-2 text-indigo-500"
          >
            <span>Бесплатное демо</span>
            <ArrowRight className="opacity-75" strokeWidth={1.6} />
          </ButtonLink>
        </div>
      </div>

      <div className="relative h-[340px] lg:w-[420px]">
        <Carousel
          classNameDots="bottom-12"
          slides={[
            <CarouselSlide
              key="01"
              className="-top-4 -left-4 h-[380px] w-[420px]"
              src="/static/images/LandingPage/HeroSection/01.jpg"
              alt="Alternative text for image"
            />,
            <CarouselSlide
              key="02"
              className="-top-4 -left-4 h-[380px] w-[420px]"
              src="/static/images/LandingPage/HeroSection/02.jpg"
              alt="Alternative text for image"
            />,
            <CarouselSlide
              key="03"
              className="-top-4 -left-4 h-[380px] w-[420px]"
              src="/static/images/LandingPage/HeroSection/03.jpg"
              alt="Alternative text for image"
            />,
            <CarouselSlide
              key="04"
              className="-top-4 -left-4 h-[380px] w-[420px]"
              src="/static/images/LandingPage/HeroSection/04.jpg"
              alt="Alternative text for image"
            />,
            <CarouselSlide
              key="05"
              className="-top-4 -left-4 h-[380px] w-[420px]"
              src="/static/images/LandingPage/HeroSection/05.jpg"
              alt="Alternative text for image"
            />,
            <CarouselSlide
              key="06"
              className="-top-4 -left-4 h-[380px] w-[420px]"
              src="/static/images/LandingPage/HeroSection/06.jpg"
              alt="Alternative text for image"
            />,
            <CarouselSlide
              key="07"
              className="-top-4 -left-4 h-[380px] w-[420px]"
              src="/static/images/LandingPage/HeroSection/07.jpg"
              alt="Alternative text for image"
            />,
            <CarouselSlide
              key="08"
              className="-top-4 -left-4 h-[380px] w-[420px]"
              src="/static/images/LandingPage/HeroSection/08.jpg"
              alt="Alternative text for image"
            />,
            <CarouselSlide
              key="09"
              className="-top-4 -left-4 h-[380px] w-[420px]"
              src="/static/images/LandingPage/HeroSection/09.jpg"
              alt="Alternative text for image"
            />
          ]}
        />

        <svg
          className="absolute -left-12 -top-[1px] -bottom-[1px] -ml-[1px] hidden h-full w-24 text-white lg:block"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="50, 0 100, 0 50, 100 0, 100" />
        </svg>
      </div>
    </section>
  );
}
