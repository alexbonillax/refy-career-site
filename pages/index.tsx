import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getCompanyInfo, getRecentJobs } from "../services";
import { WorkplacesSection } from "./locations";
import { useTranslation } from "next-i18next";
import { DepartmentsSection } from "./teams";
import { Header } from "../components/header";
import { Banner, BannerHeight, Navbar } from "../components";
import AboutCompany from "../components/about";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import getWildcardCode from "../utils/wildcard";
import Company from "../services/models/company";
import { ApplyDynamicStyles } from "../utils/dynamic-styles/apply-styles";
import { SSRCheck } from "../utils/redirects";
import { ValuesSection } from "../components/carousel/values-section";
import { JobCardsList } from "../components/lists/job-cards-list";

const Home: NextPage<{ pageProps: { companyInfo: Company } }> = ({ pageProps }: { pageProps: { companyInfo: Company } }) => {
  const { t, ready } = useTranslation("common");
  const [data, setData] = useState({ recentJobsList: null });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!pageProps.companyInfo) {
      return;
    }
    async function getJobsData() {
      ApplyDynamicStyles(pageProps.companyInfo);
      let recentJobsList = await getRecentJobs(pageProps.companyInfo.id);
      recentJobsList = { ...recentJobsList, content: recentJobsList.content.slice(0, 6) };
      setData({ recentJobsList });
      setLoading(false);
    }
    getJobsData();
  }, [pageProps.companyInfo])

  return (
    ready &&
    <>
      <Header company={pageProps.companyInfo} title={t('home')} />
      <Navbar company={pageProps.companyInfo} url='' transparent />
      <Banner
        height={BannerHeight.bigScreen}
        picture={pageProps.companyInfo.careers.home.picture}
        tagline={pageProps.companyInfo.attributes.tagline}
        title={pageProps.companyInfo.careers?.home?.title ? pageProps.companyInfo.careers?.home?.title : t('banner.subtitle', { company: pageProps.companyInfo.attributes.name })} />
      <ValuesSection section={pageProps.companyInfo?.careers?.values} values={pageProps.companyInfo.values} />
      <JobCardsList recentJobsList={data.recentJobsList} company={pageProps.companyInfo} loading={isLoading} reduced classes="background-color--white"/>
      <DepartmentsSection section={pageProps.companyInfo.careers?.departments} departments={pageProps.companyInfo.departments} reduced classes="background-color--grey--0"/>
      <WorkplacesSection section={pageProps.companyInfo.careers?.workplaces} workplaces={pageProps.companyInfo.workplaces} classes="background-color--white"/>
      <AboutCompany {...pageProps.companyInfo} />
      <Footer />
    </>
  )
};

export const getServerSideProps = async ({ req }: any) => {
  const wildcard = getWildcardCode(req.headers.host);
  const companyInfo = await getCompanyInfo(wildcard);
  const translations = await serverSideTranslations(companyInfo.careers?.languageCode ?? 'en', ["common"]);
  return SSRCheck(companyInfo, translations);
}

export default Home;
