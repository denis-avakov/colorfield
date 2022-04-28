import Link from 'next/link';
import classNames from 'utils/classNames';
import type { ReactNode, LinkProps } from 'utils/types';

type ButtonLinkProps = {
  href: string;
  attrs?: LinkProps;
  buttonType?: 'primary' | 'primary-outline' | 'secondary';
  className?: string;
  children: ReactNode;
};

export default function ButtonLink(props: ButtonLinkProps) {
  // const cssBase = [
  //   'active flex items-center justify-center transition-colors focus:outline-none',
  //   'rounded-lg px-8 py-3.5 text-base font-semibold'
  // ].join(' ');

  // if (props.buttonType === 'primary') {
  //   const css = [
  //     'button-base border-2 border-indigo-400 bg-indigo-100 bg-opacity-75 text-lg text-indigo-500',
  //     'hover:border-indigo-500 hover:bg-indigo-200',
  //     'focus-visible:border-indigo-500 focus-visible:bg-indigo-200'
  //   ].join(' ');

  //   return (
  //     <Link href="/" {...props.attrs} passHref>
  //       <button
  //         className={classNames(
  //           cssBase,
  //           'button-base border-2 border-indigo-400 bg-indigo-100 bg-opacity-75 text-lg text-indigo-500 hover:border-indigo-500 hover:bg-indigo-200 focus-visible:border-indigo-500 focus-visible:bg-indigo-200',
  //           props.className
  //         )}
  //         type="button"
  //       >
  //         {props.children}
  //       </button>
  //     </Link>
  //   );
  // }

  // if (props.buttonType === 'primary-outline') {
  //   const css = [
  //     'button-base border-2 border-indigo-400 bg-indigo-100 bg-opacity-75 text-lg text-indigo-500',
  //     'hover:border-indigo-500 hover:bg-indigo-200',
  //     'focus-visible:border-indigo-500 focus-visible:bg-indigo-200'
  //   ].join(' ');

  //   return (
  //     <Link href="/" {...props.attrs} passHref>
  //       <button className={classNames(cssBase, cssPrimaryOutline, props.className)} type="button">
  //         {props.children}
  //       </button>
  //     </Link>
  //   );
  // }

  // return (
  //   <Link href="/" {...props.attrs} passHref>
  //     <button className={classNames(cssBase, props.className)} type="button">
  //       {props.children}
  //     </button>
  //   </Link>
  // );

  return (
    <Link href={props.href} {...props.attrs}>
      <a className={classNames(`button-${props.buttonType ?? 'primary'}`, props.className)}>
        {props.children}
      </a>
    </Link>
  );
}
