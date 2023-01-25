import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useEffect } from "react";
import { getGoogleFonts } from "../../components/header";
import { DoYouWorkWithUsBanner } from "../../components/iframe/doyouworkwithus";
import { getCompanyInfo } from "../../services";
import Company from "../../services/models/company";
import { ApplyDynamicStyles } from "../../utils/dynamic-styles/apply-styles";
import { SSRCheck } from "../../utils/redirects";
import getWildcardCode from "../../utils/wildcard";


const DoYouWorkWithUs: NextPage<{ pageProps: { companyInfo: Company } }> = ({ pageProps }: { pageProps: { companyInfo: Company } }) => {
  const { ready } = useTranslation("common");

  useEffect(() => {
    if (!pageProps.companyInfo) {
      return;
    }
    async function getJobsData() {
      ApplyDynamicStyles(pageProps.companyInfo);
    }
    getJobsData();
  }, [pageProps.companyInfo])

  return (
    ready &&
    <>
    <Head>
      {
          getGoogleFonts(pageProps.companyInfo.careers?.style?.body?.font, pageProps.companyInfo.careers?.style?.header?.font)
      }
    </Head>
    <DoYouWorkWithUsBanner {...pageProps.companyInfo}/>
    </>
  )
};

export const getServerSideProps = async ({ req }: any) => {
    const wildcard = getWildcardCode(req.headers.host);
    const companyInfo = await getCompanyInfo(wildcard);
    const translations = await serverSideTranslations(companyInfo.careers?.languageCode ?? 'en', ["common"]);
    return {
      props: {
        _nextI18Next: translations._nextI18Next,
        pageProps: {
          companyInfo,
        }
      }
    }
  }
  
  export default DoYouWorkWithUs;