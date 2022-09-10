import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Banner, Navbar, randomPic } from "../../../components";
import AboutCompany from "../../../components/about";
import { Header } from "../../../components/header";
import { getCompanyInfo, getRecentJobs } from "../../../services";
import { RecentJobs } from "../../jobs";

export const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("common");
  return array ? t(text, { returnObjects: true }) : t(text);
}

const TeamJobs: NextPage = ({ pageProps }: any) => (
  <>
    <Header companyName={pageProps.companyInfo.attributes.name} title={Translate('jobs')} />
    <Navbar logoUrl={pageProps.companyInfo.attributes.logo} transparent={true} url='teams' />
    <Banner picture={randomPic(pageProps.companyInfo.departments)} tagline={pageProps.companyInfo.attributes.tagline} title={pageProps.companyInfo.attributes.name} />
    <RecentJobs {...pageProps.recentJobsList} />
    <AboutCompany {...pageProps.companyInfo} />
  </>
);


export const getServerSideProps = async ({ locale, params }: { locale: string, params: any }) => {
  const departmentId = params.id;
  const translations = await serverSideTranslations(locale, ["common"]);
  const companyInfo = await getCompanyInfo();
  const recentJobsList = await getRecentJobs(companyInfo.id, departmentId);
  return {
    props: {
      _nextI18Next: translations._nextI18Next,
      pageProps: {
        companyInfo,
        recentJobsList,
      }
    }
  };
};

export default TeamJobs;