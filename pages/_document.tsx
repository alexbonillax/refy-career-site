import Document, { Html, Head, Main, NextScript } from "next/document";
import { refy_share } from "../assets/svg/companies";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <meta name="google-site-verification" content="ypRTBYCg6gbXZu1Vr7_JZOwxh37Nc70L4Kr_spj9RYk" />
          <meta name="theme-color" content="#FE6680" />
          <meta property='og:type' content='article' />
          <meta property="og:image" content={refy_share.src} />
          <link rel="apple-touch-icon" sizes="57x57" href="/public/favicons/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/public/favicons/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/public/favicons/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/public/favicons/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/public/favicons/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/public/favicons/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/public/favicons/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/public/favicons/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/public/favicons/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/public/favicons/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/public/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/public/favicons/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/public/favicons/favicon-16x16.png" />
          <meta name="msapplication-TileColor" content="#fff" />
          <meta name="msapplication-TileImage" content="/public/favicons/ms-icon-144x144.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
