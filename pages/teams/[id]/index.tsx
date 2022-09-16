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

export const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("common");
  return array ? t(text, { returnObjects: true }) : t(text);
}

interface TeamJobsProps {
  companyInfo: Company;
  recentJobsList: Page<Job>;
  teamName: string;
}

const TeamJobs: NextPage<TeamJobsProps> = ({ companyInfo, recentJobsList, teamName }: TeamJobsProps) => (
  <>
    <Header company={companyInfo} title={Translate('teams')} />
    <Navbar logoUrl={companyInfo.attributes.logo} transparent={true} url='teams' companyUrl={companyInfo.attributes.site} />
    <Banner picture={randomPic(companyInfo.departments)} tagline={Translate('teams')} title={teamName} />
    <RecentJobs recentJobsList={recentJobsList} />
    <AboutCompany {...companyInfo} />
    <Footer />
  </>
);


export const getServerSideProps = async ({ locale, params }: { locale: string, params: any }) => {
  const departmentId = params.id;
  const translations = await serverSideTranslations(locale, ["common"]);
  const companyInfo = await getCompanyInfo();
  const recentJobsList = await getRecentJobs(companyInfo.id, departmentId);
  const teamName = companyInfo.departments.find(department => department.id === +departmentId)?.attributes.name;
  return {
    props: {
      _nextI18Next: translations._nextI18Next,
      companyInfo,
      recentJobsList,
      departmentId,
      teamName
    }
  };
};

export default TeamJobs;