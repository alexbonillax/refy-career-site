import Document, { Html, Head, Main, NextScript } from "next/document";
import { refy_share } from "../assets/svg/companies";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
