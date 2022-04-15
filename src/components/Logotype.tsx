import Link from 'components/Link';
import { Keyframes } from 'iconoir-react';

export default function Logotype() {
  return (
    <Link href="/" className="flex items-center rounded-lg py-2 px-4">
      <Keyframes className="mr-2 h-10 w-10" strokeWidth={1} />
      <span className="text-2xl font-semibold uppercase tracking-wide lg:text-3xl">Colorfield</span>
    </Link>
  );
}
