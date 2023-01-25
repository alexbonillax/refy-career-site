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
import Router from 'next/router';

const Home: NextPage<{ pageProps: { companyInfo: Company } }> = ({ pageProps }: { pageProps: { companyInfo: Company } }) => {
  const { t, ready } = useTranslation("common");
  const [data, setData] = useState({ jobList: null });
  const [isLoading, setLoading] = useState(true);
  const goToSearchJobs = (jobId: string) => Router.push(`/jobs?search=${jobId}`)

  useEffect(() => {
    if (!pageProps.companyInfo) {
      return;
    }
    async function getJobsData() {
      ApplyDynamicStyles(pageProps.companyInfo);
      let jobList = await getRecentJobs(pageProps.companyInfo.id);
      jobList = { ...jobList, content: jobList.content.slice(0, 6) };
      setData({ jobList });
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
        company={pageProps.companyInfo}
        height={BannerHeight.bigScreen}
        searchBar
        picture={pageProps.companyInfo.careers.home.picture}
        tagline={pageProps.companyInfo.attributes.tagline}
        title={pageProps.companyInfo.careers?.home?.title ? pageProps.companyInfo.careers?.home?.title : t('banner.subtitle', { company: pageProps.companyInfo.attributes.name })}
        onSearch={goToSearchJobs} />
      <iframe src="http://localhost:3000/doyouworkwithus" scrolling="no" width="1200px" height="256px"></iframe>

      <ValuesSection section={pageProps.companyInfo?.careers?.values} values={pageProps.companyInfo.values} />
      <JobCardsList jobList={data.jobList} company={pageProps.companyInfo} loading={isLoading} reduced classes="background-color--white" />
      <DepartmentsSection section={pageProps.companyInfo.careers?.departments} departments={pageProps.companyInfo.departments} reduced classes="background-color--grey--0" />
      <WorkplacesSection section={pageProps.companyInfo.careers?.workplaces} workplaces={pageProps.companyInfo.workplaces} classes="background-color--white" />
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
