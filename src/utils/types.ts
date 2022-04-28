export type { ReactNode } from 'react';
export type { LinkProps } from 'next/link';
export type { ImageProps } from 'next/image';

export type ProductProps = {
  id: string;
  name: string;
  features: string[];
  price: string;
  images: {
    id: string;
    src: string;
    alt: string;
  }[];
};
