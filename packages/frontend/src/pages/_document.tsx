import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:wght@900&text=COLORFIELD&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        <link rel="icon" href="/static/favicons/favicon.ico" sizes="any" />
        <link rel="icon" href="/static/favicons/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/static/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/static/favicons/manifest.webmanifest" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
