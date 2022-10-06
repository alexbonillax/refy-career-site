import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getCompanyInfo, getRecentJobs } from "../services";
import { RecentJobs } from "./jobs";
import { Workplaces } from "./locations";
import { useTranslation } from "next-i18next";
import { Areas } from "./teams";
import { Header } from "../components/header";
import { Banner, BannerHeight, Navbar, randomPic } from "../components";
import AboutCompany from "../components/about";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import getWildcardCode from "../utils/wildcard";
import Company from "../services/models/company";
import { ApplyDynamicStyles } from "../utils/dynamic-styles/apply-styles";


const Home: NextPage<{ pageProps: { companyInfo: Company } }> = ({ pageProps }: { pageProps: {companyInfo: Company}}) => {
  const { t, ready } = useTranslation("common");
  const [data, setData] = useState({ recentJobsList: null });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!pageProps.companyInfo) {
      return;
    }
    async function getJobsData() {
      ApplyDynamicStyles(pageProps.companyInfo.attributes.primaryColor, pageProps.companyInfo.careers?.style);
      console.log(pageProps.companyInfo);
      let recentJobsList = await getRecentJobs(pageProps.companyInfo.id);
      recentJobsList = {...recentJobsList, content: recentJobsList.content.slice(0,6)};
      setData({ recentJobsList });
      setLoading(false);
    }
    getJobsData();
  }, [pageProps.companyInfo])

  return (
    ready &&
    <>
      <Header company={pageProps.companyInfo} title={t('home')} />
      <Navbar company={pageProps.companyInfo} url='' transparent={true} />
      <Banner height={BannerHeight.bigScreen} picture={randomPic(pageProps.companyInfo.departments)} tagline={pageProps.companyInfo.attributes.tagline} title={t('banner.subtitle', { company: pageProps.companyInfo.attributes.name })} />
      <Areas departments={pageProps.companyInfo.departments.slice(0,4)} reduced colorButton={pageProps.companyInfo.attributes.primaryColor}/>
      <Workplaces companyInfo={pageProps.companyInfo} classes="background-color--grey--0" />
      <RecentJobs recentJobsList={data.recentJobsList} loading={isLoading} reduced buttonColor={pageProps.companyInfo.attributes.primaryColor} />
      <AboutCompany {...pageProps.companyInfo} />
      <Footer />
    </>
  )
};

export const getServerSideProps = async ({ locale, req }: any) => {
  const translations = await serverSideTranslations(locale, ["common"]);
  const wildcard = getWildcardCode(req.headers.host);
  const companyInfo = await getCompanyInfo(wildcard);

  return {
    props: {
      _nextI18Next: translations._nextI18Next,
      pageProps: {
        companyInfo,
      }
    }
  };
};

export default Home;
