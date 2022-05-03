import { useState, useEffect } from 'react';
import { ArrowRight } from 'iconoir-react';
import { isEmpty } from 'lodash';
import classNames from 'utils/classNames';

import ProductShowcase from 'components/Shop/ProductShowcase';
import Spinner from 'components/Spinner';
import ButtonLink from 'components/ButtonLink';

type CatalogPreviewProps = {
  className?: string;
};

export default function CatalogPreview(props: CatalogPreviewProps) {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/random-products');
      setRandomProducts(await response.json());
    }

    fetchProducts();
  }, []);

  return (
    <section className={classNames('w-full space-y-8', props.className)}>
      <h1 className="text-center text-3xl font-medium">
        Подберите формат и цветовую гамму будущей картины
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-4 lg:flex-nowrap">
        {isEmpty(randomProducts) ? (
          <Spinner />
        ) : (
          randomProducts.map((product: any) => <ProductShowcase key={product.id} {...product} />)
        )}
      </div>

      <div className="flex justify-center">
        <ButtonLink href="/products" className="space-x-2">
          <span>Все доступные вариации</span>
          <ArrowRight className="opacity-75" strokeWidth={1.6} />
        </ButtonLink>
      </div>
    </section>
  );
}
