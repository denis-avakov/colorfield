import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'utils/classNames';

export default function NavItem(props: { href: string; text: string }) {
  const router = useRouter();
  const isActive = router.asPath === props.href;

  return (
    <Link href={props.href}>
      <a
        className={classNames(
          'focus-visible:focus active:active py-2 px-4 hover:underline hover:decoration-violet-300 hover:decoration-2 hover:underline-offset-4',
          isActive && 'rounded-lg bg-white bg-opacity-5 font-semibold'
        )}
      >
        {props.text}
      </a>
    </Link>
  );
}
