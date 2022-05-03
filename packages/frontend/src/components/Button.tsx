import Link from 'next/link';
import classNames from 'utils/classNames';
import type { ReactNode, LinkProps } from 'utils/types';

type BaseLinkProps = {
  className?: string;
  children: ReactNode;
} & LinkProps;

type BaseButtonProps = {
  className?: string;
  children: ReactNode;
} & JSX.IntrinsicElements['button'];

function BaseLink({ href, className, children, ...attrs }: BaseLinkProps) {
  return (
    <Link href={href} {...attrs}>
      <a className={classNames(className)}>{children}</a>
    </Link>
  );
}

function BaseButton({ className, children, ...attrs }: BaseButtonProps) {
  return (
    <button className={classNames(className)} {...attrs}>
      {children}
    </button>
  );
}

const styles = {
  base: 'active flex items-center justify-center rounded-lg px-8 py-3.5 text-base font-semibold transition-colors focus:outline-none',
  primary:
    'button-base border-2 border-indigo-400 bg-indigo-100 bg-opacity-75 text-lg text-indigo-500'
};

export function Button(props: any) {
  const { href, className, children, ...attrs } = props;

  if ((props.as = 'link')) {
    return (
      <Link href={href} {...attrs}>
        <a className={classNames(className)}>{children}</a>
      </Link>
    );
  }

  return (
    <button href={href} className={classNames(styles.base, styles.primary, className)} {...attrs}>
      <a className={classNames(className)}>{children}</a>
    </button>
  );
}
