import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'utils/classNames';

export default function MobileMenuItem(props: { href: string; text: string }) {
  const router = useRouter();
  const isActive = router.asPath === props.href;

  return (
    <li className="flex items-center justify-between py-2">
      <Link href={props.href}>
        <a
          className={classNames(
            'w-full px-4 py-2 text-xl font-medium text-indigo-600',
            isActive && 'rounded-lg bg-black bg-opacity-10 font-semibold'
          )}
        >
          {props.text}
        </a>
      </Link>
    </li>
  );
}
