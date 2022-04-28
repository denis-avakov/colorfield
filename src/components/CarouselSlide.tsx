import Image from 'next/image';
import classNames from 'utils/classNames';

export default function CarouselSlide(props: { className?: string; src: string; alt: string }) {
  return (
    <div className={classNames('relative opacity-90', props.className)}>
      <Image
        src={props.src}
        alt={props.alt}
        objectFit="cover"
        objectPosition="center"
        layout="fill"
        priority={true}
      />

      <div className="absolute bottom-0 h-1/4 w-full bg-gradient-to-t from-black opacity-100" />
    </div>
  );
}
