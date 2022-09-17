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

export const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("common");
  return array ? t(text, { returnObjects: true }) : t(text);
}

const Home: NextPage = ({ pageProps }: any) => {
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
      <Header company={pageProps.companyInfo} title={Translate('home')} />
      <Navbar logoUrl={pageProps.companyInfo.attributes.logo} url='' transparent={true} companyUrl={pageProps.companyInfo.attributes.site} />
      <Banner picture={randomPic(pageProps.companyInfo.departments)} tagline={pageProps.companyInfo.attributes.tagline} title={pageProps.companyInfo.attributes.name} />
      <Areas {...pageProps.companyInfo} />
      <Workplaces companyInfo={pageProps.companyInfo} classes="background-color--grey--0" />
      {
        !isLoading &&
        <RecentJobs recentJobsList={data.recentJobsList} />
      }
      {
        isLoading &&
        <p>Loading</p>
      }
      <AboutCompany {...pageProps.companyInfo} />
      <Footer />
    </>
  )
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const translations = await serverSideTranslations(locale, ["common"]);
  const companyInfo = await getCompanyInfo();
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
