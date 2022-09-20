import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getCompanyInfo, getRecentJobs } from "../services";
import { RecentJobs } from "./jobs";
import { Workplaces } from "./locations";
import { useTranslation } from "next-i18next";

import { Areas } from "./teams";
import { Header } from "../components/header";
import { Banner, Navbar, randomPic } from "../components";
import AboutCompany from "../components/about";
import Footer from "../components/footer";
import { useEffect, useState } from "react";

const Home: NextPage = ({ pageProps }: any) => {
  const { t } = useTranslation("common");
  const [data, setData] = useState({ recentJobsList: null });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!pageProps.companyInfo) {
      return;
    }
    async function getJobsData() {
      const recentJobsList = await getRecentJobs(pageProps.companyInfo.id);
      setData({ recentJobsList });
      setLoading(false);
    }
    getJobsData();
  }, [pageProps.companyInfo])

  return (
    <>
      <Header company={pageProps.companyInfo} title={t('home')} />
      <Navbar logoUrl={pageProps.companyInfo.attributes.logo} url='' transparent={true} companyUrl={pageProps.companyInfo.attributes.site} color={pageProps.companyInfo.attributes.primaryColor} />
      <Banner picture={randomPic(pageProps.companyInfo.departments)} tagline={pageProps.companyInfo.attributes.tagline} title={t('banner.subtitle', { company: pageProps.companyInfo.attributes.name })} />
      <Areas {...pageProps.companyInfo} />
      <Workplaces companyInfo={pageProps.companyInfo} classes="background-color--grey--0" />
      <RecentJobs recentJobsList={data.recentJobsList} loading={isLoading} />
      <AboutCompany {...pageProps.companyInfo} />
      <Footer />
    </>
  )
};

export const getServerSideProps = async ({ locale, req }: any) => {
  const translations = await serverSideTranslations(locale, ["common"]);
  const companyInfo = await getCompanyInfo(req.headers.host);
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
