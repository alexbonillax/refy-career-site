import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Layout from "../layout/layout";
import nextI18NextConfig from "../next-i18next.config.js";
import createEmotionCache from "../components/material-ui/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";

import Script from "next/script";
import { CssBaseline } from "@mui/material";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function RefyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Layout>
        <CssBaseline />
        <Script id="googleTagManagerJs" strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-DTK9CRBM74`} />
        <Script id="googleTagManagerScript" strategy="lazyOnload">
          {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-DTK9CRBM74', {
                    page_path: window.location.pathname,
                    });
                `}
        </Script>
        <Component {...pageProps} />
      </Layout>
    </CacheProvider>
  );
}

export default appWithTranslation(RefyApp, nextI18NextConfig);
