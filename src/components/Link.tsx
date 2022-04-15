import LinkWrapper from 'next/link';
import classNames from 'classnames/dedupe';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type LinkProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<'a'>;

export default function Link({ href, className, children, ...attrs }: LinkProps) {
  return (
    <LinkWrapper href={href || '/'} passHref>
      <a className={classNames('action', className)} {...attrs}>
        {children}
      </a>
    </LinkWrapper>
  );
}
