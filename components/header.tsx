import { stripHtmlTags } from "../utils";
import Head from "next/head";
import Company, { GoogleFont } from "../services/models/company";
import { bucketM } from "../services/urls";

interface HeaderProps {
  company: Company;
  title: string;
}

export const Header = ({ company, title }: HeaderProps) => {
  const getGoogleFonts = (body: GoogleFont, header: GoogleFont) => {
    let bodyFont = body?.name ? `family=${body.name.replace(' ', '+')}` : '';
    let headerFont = header?.name ? `family=${header.name.replace(' ', '+')}` : '';
    headerFont = bodyFont && headerFont ? `&${headerFont}` : headerFont;
    bodyFont = !(bodyFont || headerFont) ? 'family=Fira+Sans' : bodyFont;
    return <link href={`https://fonts.googleapis.com/css2?${bodyFont}${headerFont}`} rel="stylesheet" />
  }

  const favicon = company.attributes.logo ? bucketM + company.attributes.logo : false;
  return (
    <Head>
      <title>{`${title} | ${company.attributes.name}`}</title>
      <meta property="og:title" content={`${title} | ${company.attributes.name}`} />
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
  )
}


