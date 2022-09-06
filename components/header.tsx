import { stripHtmlTags } from "../utils";
import Head from "next/head";
import { useTranslation } from "next-i18next";

interface HeaderProps {
  title: string;
  subtitle?: string;
  companyName: string;
}

export const Header = (banner: HeaderProps) => {
  return(
  <Head>
    <title>{`${banner.title} | ${banner.companyName}`}</title>
    <meta property="og:title" content={`${banner.title} | ${banner.companyName}`} />
    { 
      banner.subtitle &&
      <meta property="og:description" content={stripHtmlTags((banner.subtitle))} />  
    }
    
  </Head>
  )
}
