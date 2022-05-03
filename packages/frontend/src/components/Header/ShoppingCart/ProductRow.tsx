import { RemoveEmpty } from 'iconoir-react';
import type { ProductProps } from 'utils/types';

type ProductRowProps = ProductProps & {
  quantity: number;
  onRemove: (id: string) => void;
};

export default function ProductRow(props: ProductRowProps) {
  return (
    <li className="flex items-center justify-between py-3">
      <h3 className="font-medium text-gray-900">
        <span>{props.name}</span>
        <span className="ml-1 text-gray-400">x{props.quantity}</span>
      </h3>

      <div className="flex items-center">
        <p className="text-gray-500">{props.price} руб.</p>

        <button
          type="button"
          className="text-gray-400 transition-colors hover:text-gray-700"
          onClick={() => props.onRemove(props.id)}
        >
          <RemoveEmpty className="ml-3 h-6 w-6" strokeWidth={1.8} />
        </button>
      </div>
    </li>
  );
}
