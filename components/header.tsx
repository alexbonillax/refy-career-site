import { stripHtmlTags } from "../utils";
import Head from "next/head";
import Company, { GoogleFont } from "../services/models/company";
import { bucketM } from "../services/urls";
import Script from "next/script";
import { CookiesBanner } from "./cookies/cookies-banner";

interface HeaderProps {
  company: Company;
  title: string;
}

export const Header = ({ company, title }: HeaderProps) => {

  const favicon = company?.attributes?.logo ? bucketM + company?.attributes.logo : false;
  return (
    <>
      <Head>
        <title>{`${title} | ${company.attributes.name}`}</title>
        <meta property="og:title" content={`${title} | ${company.attributes.name}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        {
          company.attributes.description &&
          <meta property="og:description" content={stripHtmlTags((company.attributes.description))} />
        }
        {
          company.attributes.primaryColor &&
          <>
            <meta name="msapplication-TileColor" content={company.attributes.primaryColor} />
            <meta name="theme-color" content={company.attributes.primaryColor} />
          </>
        }
        {
          favicon &&
          <>
            <link id="appIcon" rel="icon" type="image/png" href={favicon} />
            <meta name="msapplication-TileImage" content={favicon} />
          </>
        }
        {
          getGoogleFonts(company.careers?.style?.body?.font, company.careers?.style?.header?.font)
        }
      </Head>
      <GoogleTagManager code={company.careers.analytics?.google} />
      {
        company.careers?.published &&
         <CookiesBanner />
      }
    </>
  )
}

export const HeaderNoCompany = ({ title }: {title: string}) => {
  return (
    <>
      <Head>
        <title>{`${title}`}</title>
        <meta property="og:title" content={`${title}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <meta name="msapplication-TileColor" content='#fe6680' />
        <meta name="theme-color" content='#fe6680' />
        <link id="appIcon" rel="icon" type="image/png" href={'https://refy.s3-eu-west-1.amazonaws.com/images/m/company_1623c844f8a9fe.jpg'} />
        <meta name="msapplication-TileImage" content={'https://refy.s3-eu-west-1.amazonaws.com/images/m/company_1623c844f8a9fe.jpg'} />
        { getGoogleFonts(null, null)}
      </Head>
      {/* <CookiesBanner /> */}
    </>
  )
}

export const getGoogleFonts = (body: GoogleFont, header: GoogleFont) => {
  let headerFont = (header?.name ?? 'Fira Sans').replace(' ', '+');
  let bodyFont = (body?.name ?? 'Fira Sans').replace(' ', '+');
  return <link href={`https://fonts.googleapis.com/css2?family=${headerFont}:wght@500;600;700&family=${bodyFont}`} rel="stylesheet" />
}

const GoogleTagManager = ({ code }: { code: string }) => (
  code &&
  <>
    <Script id="google-tag-manager" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${code}');
      `}
    </Script>
    <Script
      src="https://www.google-analytics.com/analytics.js"
      strategy="afterInteractive"
    />
  </>
)
