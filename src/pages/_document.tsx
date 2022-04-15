import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="preconnect" href="https://rsms.me" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

        <link rel="icon" href="/static/favicons/favicon.ico" sizes="any" />
        <link rel="icon" href="/static/favicons/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/static/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/static/favicons/manifest.webmanifest" />
      </Head>

      <body className="bg-white text-slate-600">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
