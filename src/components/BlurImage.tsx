import { useState } from 'react';
import Image from 'next/image';
import classNames from 'utils/classNames';
import type { ImageProps } from 'utils/types';

export default function BlurImage(props: ImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      alt={props.alt}
      objectFit="cover"
      objectPosition="center"
      layout="fill"
      className={classNames(
        'duration-700 ease-in-out group-hover:opacity-75',
        isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'
      )}
      onLoadingComplete={() => setLoading(false)}
      {...props}
    />
  );
}
