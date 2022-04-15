import { useState } from 'react';
import Link from 'next/link';
import Image, { ImageProps } from 'next/image';
import classNames from 'classnames';

type PreviewProps = {
  className?: string;
  href: string;
  title: string;
  subtitle: string;
} & ImageProps;

export default function Preview({ className, href, title, subtitle, ...attrs }: PreviewProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div
      className={classNames(
        'focus-within:focus active:active group relative overflow-hidden rounded-lg',
        className
      )}
    >
      <Link href={href}>
        <a>
          <Image
            alt={attrs.alt}
            objectFit="cover"
            objectPosition="top"
            layout="fill"
            className={classNames(
              'duration-700 ease-in-out group-hover:opacity-75',
              isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'
            )}
            onLoadingComplete={() => setLoading(false)}
            {...attrs}
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-transparent to-black opacity-5"
          />

          <div className="relative flex h-full flex-col justify-end p-6">
            <h3 className="font-semibold text-white">{title}</h3>

            <p aria-hidden="true" className="mt-1 text-sm text-white">
              {subtitle}
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
}
