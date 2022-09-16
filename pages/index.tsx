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

export const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("common");
  return array ? t(text, { returnObjects: true }) : t(text);
}

const Home: NextPage = ({ pageProps }: any) => (
  <>
    <Header company={pageProps.companyInfo} title={Translate('home')} />
    <Navbar logoUrl={pageProps.companyInfo.attributes.logo} url='' transparent={true} companyUrl={pageProps.companyInfo.attributes.site} />
    <Banner picture={randomPic(pageProps.companyInfo.departments)} tagline={pageProps.companyInfo.attributes.tagline} title={pageProps.companyInfo.attributes.name} />
    <Areas {...pageProps.companyInfo} />
    <Workplaces companyInfo={pageProps.companyInfo} classes="background-color--grey--0" />
    <RecentJobs {...pageProps.recentJobsList} />
    <AboutCompany {...pageProps.companyInfo} />
    <Footer />
  </>
);

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const translations = await serverSideTranslations(locale, ["common"]);
  const companyInfo = await getCompanyInfo();
  const recentJobsList = await getRecentJobs(companyInfo.id);
  return {
    props: {
      _nextI18Next: translations._nextI18Next,
      pageProps: {
        companyInfo,
        recentJobsList
      }
    }
  };
};

export default Home;
