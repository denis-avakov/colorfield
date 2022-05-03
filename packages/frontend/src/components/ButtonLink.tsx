import Link from 'next/link';
import classNames from 'utils/classNames';
import type { ReactNode, LinkProps } from 'utils/types';

type ButtonLinkProps = {
  href: string;
  next?: LinkProps;
  attrs?: any;
  buttonType?: 'primary' | 'primary-outline' | 'secondary';
  className?: string;
  children: ReactNode;
};

const ButtonLinkDefaults = {
  href: '/',
  children: null
};

export default function ButtonLink(props: ButtonLinkProps = ButtonLinkDefaults) {
  return (
    <Link href={props.href} {...props.next}>
      <a
        className={classNames(`button-${props.buttonType ?? 'primary'}`, props.className)}
        {...props.attrs}
      >
        {props.children}
      </a>
    </Link>
  );
}
