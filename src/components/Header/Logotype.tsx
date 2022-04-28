import Link from 'next/link';
import classNames from 'utils/classNames';

export default function Logotype(props: { className?: string }) {
  return (
    <Link href="/">
      <a
        className={classNames(
          'focus-visible:focus active:active group flex items-center py-2 px-4',
          props.className
        )}
      >
        <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-pink-300 bg-clip-text font-[Fraunces] text-3xl font-extrabold uppercase tracking-tight text-transparent group-hover:from-violet-400 group-hover:via-purple-400 group-hover:to-pink-400 md:text-4xl">
          Colorfield
        </span>
      </a>
    </Link>
  );
}
