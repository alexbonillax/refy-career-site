import Document, { Html, Head, Main, NextScript } from "next/document";
import { refy_share } from "../assets/svg/companies";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <link id="appIcon" rel="icon" type="image/png" href="/assets/favicons/favicon-96x96.png" />
          <meta name="msapplication-TileColor" content="#fff" />
          <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png" />
          <link rel="manifest" href="manifest.json" />
          <meta name="theme-color" content="#fff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
