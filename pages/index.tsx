import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Company from "../services/models/company";
import Department from "../services/models/department";
import { AboutCompany } from "../components/about";
import { getCompanyInfo, getRecentJobs } from "../services";
import { RecentJobs } from "./jobs";
import { Workplaces } from "./locations";
import { useTranslation } from "next-i18next";

import { bucketXXL } from "../services/urls";
import { Areas } from "./teams";
import { Header } from "../components/header";
import { Navbar } from "../components";

export const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("common");
  return array ? t(text, { returnObjects: true }) : t(text);
}

const randomPic = (departments: Department[]): string => departments.find(department => !!department.attributes.picture)?.attributes.picture || '';

const Banner = (companyInfo: Company) => {
  const pic = randomPic(companyInfo.departments);
  const picUrl = pic ? bucketXXL+pic : false;
  return (<section id="home-banner" className="background-color--dark background-center" style={{ backgroundImage: picUrl ? `url(${picUrl})` : '' }}>
    <div className="relative flex-col flex-align-justify-center background-color--blurr-dark desktop:py-20">
      <div className="mobile-container flex-col flex-justify-center flex-align-center px-3 py-20 text-center">
        <p className="font-subtitle font--white">{companyInfo.attributes.tagline}</p>
        <p className="font-big-title font-big-title--46 font--white">{companyInfo.attributes.name}</p>
      </div>
    </div>
  </section>)
};


const Home: NextPage = ({ pageProps }: any) => (
  <>
    <Header name={pageProps.companyInfo.attributes.name} />
    <div className="pt-9">
      <Navbar logoUrl={pageProps.companyInfo.attributes.logo}/>
      <Banner {...pageProps.companyInfo} />
      <Areas {...pageProps.companyInfo} />
      <Workplaces {...pageProps.companyInfo} />
      <RecentJobs {...pageProps.recentJobsList} />
      <AboutCompany {...pageProps.companyInfo}/>
    </div>
  </>
);


export const getStaticProps = async ({ locale }: { locale: string }) => {
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
