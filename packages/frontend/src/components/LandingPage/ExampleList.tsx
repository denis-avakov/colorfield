import classNames from 'utils/classNames';

type ExampleListProps = {
  className?: string;
};

export default function ExampleList(props: ExampleListProps) {
  return (
    <section className={classNames(props.className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Подбери свой формат картины и цветовую гамму
        </h2>
      </div>

      <div className="relative mt-4 w-full overflow-x-auto">
        <ul
          role="list"
          className="inline-flex space-x-8 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-x-0"
        >
          <li className="inline-flex w-64 flex-col text-center lg:w-auto">
            <div className="group relative">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                <div className="h-full w-full object-cover object-center group-hover:opacity-75"></div>
              </div>

              <div className="mt-6">
                <p className="mt-1 text-gray-900">Цветовая гамма: монохромная</p>
                <p className="mt-1 text-gray-900">Количество цветов: 6</p>
              </div>
            </div>
          </li>

          <li className="inline-flex w-64 flex-col text-center lg:w-auto">
            <div className="group relative">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                <div className="h-full w-full object-cover object-center group-hover:opacity-75"></div>
              </div>

              <div className="mt-6">
                <p className="mt-1 text-gray-900">Цветовая гамма: аналогичная</p>
                <p className="mt-1 text-gray-900">Количество цветов: 22</p>
              </div>
            </div>
          </li>

          <li className="inline-flex w-64 flex-col text-center lg:w-auto">
            <div className="group relative">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                <div className="h-full w-full object-cover object-center group-hover:opacity-75"></div>
              </div>

              <div className="mt-6">
                <p className="mt-1 text-gray-900">Цветовая гамма: комплементарная</p>
                <p className="mt-1 text-gray-900">Количество цветов: 10</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
