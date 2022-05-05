import useSWR from 'swr';

import Layout from 'components/Layout';
import ProductShowcase from 'components/Shop/ProductShowcase';
import Spinner from 'components/Spinner';

export default function Products() {
  const { data, error } = useSWR('/api/products');

  return (
    <Layout title="Каталог – COLORFIELD">
      <h2 className="sr-only">Products</h2>

      <div className="grid grid-cols-3 gap-4">
        {!data ? (
          <Spinner className="col-span-full flex justify-center" />
        ) : (
          data.map((product: any) => <ProductShowcase key={product.id} {...product} />)
        )}
      </div>
    </Layout>
  );
}
