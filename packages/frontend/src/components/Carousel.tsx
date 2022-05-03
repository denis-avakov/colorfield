import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import classNames from 'utils/classNames';
import type { ReactNode } from 'utils/types';

type CarouselProps = {
  className?: string;
  classNameDots?: string;
  slides: ReactNode[];
};

export default function Carousel(props: CarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [wrapperReference, api] = useEmblaCarousel();

  // prettier-ignore
  const scrollTo = useCallback((index: number) => {
    return api && api.scrollTo(index);
  }, [api]);

  const onSelect = useCallback(() => {
    return api && setSelectedIndex(api.selectedScrollSnap());
  }, [api, setSelectedIndex]);

  useEffect(() => {
    if (api) {
      onSelect();
      setScrollSnaps(api.scrollSnapList());
      api.on('select', onSelect);
    }
  }, [api, setScrollSnaps, onSelect]);

  return (
    <div
      className={classNames(
        'relative overflow-hidden hover:cursor-grab active:cursor-grabbing',
        props.className
      )}
      ref={wrapperReference}
    >
      <div className="flex">
        {props.slides.map((children: ReactNode, index: number) => (
          <div key={index}>{children}</div>
        ))}
      </div>

      <div
        className={classNames('absolute bottom-2 flex w-full justify-center', props.classNameDots)}
      >
        <div className="flex space-x-2 px-2 py-1.5">
          {scrollSnaps.map((_: any, index: any) => (
            <button
              key={index}
              type="button"
              className={classNames(
                'h-1 w-5 rounded-full transition-all',
                index === selectedIndex ? 'bg-indigo-400' : 'bg-indigo-50 opacity-50'
              )}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
