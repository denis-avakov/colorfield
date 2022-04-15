import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';

export default function NavItem(props: { href: string; text: string }) {
  const router = useRouter();
  const isActive = router.asPath === props.href;

  return (
    <Link href={props.href}>
      <a className={classNames('action py-2 px-4', isActive && 'font-semibold text-zinc-200')}>
        {props.text}
      </a>
    </Link>
  );
}
