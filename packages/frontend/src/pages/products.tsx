import { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';

import Layout from 'components/Layout';
import ProductShowcase from 'components/Shop/ProductShowcase';
import Spinner from 'components/Spinner';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/products');
      setProducts(await response.json());
    }

    fetchProducts();
  }, []);

  return (
    <Layout title="Каталог – COLORFIELD">
      <h2 className="sr-only">Products</h2>

      <div className="grid grid-cols-3 gap-4">
        {isEmpty(products) ? (
          <Spinner className="col-span-full flex justify-center" />
        ) : (
          products.map((product: any) => <ProductShowcase key={product.id} {...product} />)
        )}
      </div>
    </Layout>
  );
}
