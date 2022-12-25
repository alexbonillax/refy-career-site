import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Layout from "../components/material-ui/layout/layout";
import nextI18NextConfig from "../next-i18next.config.js";
import { CssBaseline } from "@mui/material";
import { CookiesBanner } from "../components/cookies/cookies-banner";


function RefyApp(props: AppProps) {
  const { Component, pageProps } = props
  return (
    <Layout>
      <CssBaseline />
      <Component {...pageProps} />
      {
        pageProps.pageProps?.companyInfo?.careers?.published &&
         <CookiesBanner />
      }
    </Layout>
  );
}

export default appWithTranslation(RefyApp, nextI18NextConfig);
