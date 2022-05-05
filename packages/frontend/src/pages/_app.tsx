import '../styles.css';
import { SWRConfig } from 'swr';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const fetcher = (resource: string, init: any) => {
    return fetch(resource, init).then((response) => response.json());
  };

  return (
    <SWRConfig value={{ refreshInterval: 3000, fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
