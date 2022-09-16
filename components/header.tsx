import { stripHtmlTags } from "../utils";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import Company from "../services/models/company";
import { bucketM } from "../services/urls";

interface HeaderProps {
  company: Company;
  title: string;
}

export const Header = (banner: HeaderProps) => {
  const favicon = banner.company.attributes.logo ? bucketM + banner.company.attributes.logo : false;
  return (
    <Head>
      <title>{`${banner.title} | ${banner.company.attributes.name}`}</title>
      <meta property="og:title" content={`${banner.title} | ${banner.company.attributes.name}`} />
      {
        banner.company.attributes.description &&
        <meta property="og:description" content={stripHtmlTags((banner.company.attributes.description))} />
      }
      {
        banner.company.attributes.primaryColor &&
        <>
          <meta name="msapplication-TileColor" content={banner.company.attributes.primaryColor} />
          <meta name="theme-color" content={banner.company.attributes.primaryColor} />
        </>
      }
      {
        favicon &&
        <>
          <link id="appIcon" rel="icon" type="image/png" href={favicon} />
          <meta name="msapplication-TileImage" content={favicon} />
        </>
      }
    </Head>
  )
}


