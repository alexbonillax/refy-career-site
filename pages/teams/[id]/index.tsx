import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Banner, Navbar, randomPic } from "../../../components";
import AboutCompany from "../../../components/about";
import { Header } from "../../../components/header";
import { getCompanyInfo, getRecentJobs } from "../../../services";
import Company from "../../../services/models/company";
import Page from "../../../services/models/page";
import Job from "../../../services/models/job";

import { RecentJobs } from "../../jobs";
import Footer from "../../../components/footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DEFAULT_WILDCARD } from "../../../constants/urls";

export const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("common");
  return array ? t(text, { returnObjects: true }) : t(text);
}

interface TeamJobsProps {
  recentJobsList: Page<Job>;
  teamName: string;
}

const TeamJobs: NextPage<{ companyInfo: Company }> = ({ companyInfo }: { companyInfo: Company }) => {
  const departmentId = +useRouter().query?.id;
  const [data, setData] = useState<TeamJobsProps>({ recentJobsList: null, teamName: null })
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    if (!departmentId) { return; }
    async function getJobsData() {
      const recentJobsList = await getRecentJobs(companyInfo.id, departmentId);
      const teamName = companyInfo.departments.find(department => department.id === +departmentId)?.attributes.name;
      setData({ recentJobsList, teamName });
      setLoading(false);
    }
    getJobsData();
  }, [])
  return (
    <>
      <Header company={companyInfo} title={Translate('teams')} />
      <Navbar logoUrl={companyInfo.attributes.logo} transparent={true} url='teams' companyUrl={companyInfo.attributes.site} color={companyInfo.attributes.primaryColor} />
      <Banner picture={randomPic(companyInfo.departments)} tagline={Translate('teams')} title={data.teamName} />
      <RecentJobs recentJobsList={data.recentJobsList} loading={isLoading} />
      <AboutCompany {...companyInfo} />
      <Footer />
    </>
  )
};


export const getServerSideProps = async ({ locale, req }: any) => {
  const translations = await serverSideTranslations(locale, ["common"]);
  const wildcard = (process.env.NODE_ENV != "development" && req.headers.host.includes(process.env.WEBSITE_URL)) ? req.headers.host.split(".")[0] : DEFAULT_WILDCARD;
  const companyInfo = await getCompanyInfo(wildcard);
  return {
    props: {
      _nextI18Next: translations._nextI18Next,
      companyInfo,
    }
  };
};

export default TeamJobs;