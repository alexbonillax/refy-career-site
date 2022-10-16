import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Layout from "../components/material-ui/layout/layout";
import nextI18NextConfig from "../next-i18next.config.js";
import { CssBaseline } from "@mui/material";


function RefyApp(props: AppProps) {
  const { Component, pageProps } = props
  return (
    <Layout>
      <CssBaseline />
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(RefyApp, nextI18NextConfig);
