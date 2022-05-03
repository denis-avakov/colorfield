import classNames from 'utils/classNames';
import type { ReactNode } from 'utils/types';

type BadgeProps = {
  className?: string;
  children: ReactNode;
};

export default function Badge(props: BadgeProps) {
  return (
    <div className={classNames('absolute bottom-0.5 right-1.5', props.className)}>
      <span className="bg-zinc-700 px-1 py-0.5 text-xs font-medium">{props.children}</span>
    </div>
  );
}
