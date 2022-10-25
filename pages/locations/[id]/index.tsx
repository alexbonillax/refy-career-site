import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Banner, BannerHeight, Navbar } from "../../../components";
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
import getWildcardCode from "../../../utils/wildcard";
import Router from 'next/router';
import { ApplyDynamicStyles } from "../../../utils/dynamic-styles/apply-styles";
import { SSRCheck } from "../../../utils/redirects";
import Workplace from "../../../services/models/workplace";

export const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("common");
  return array ? t(text, { returnObjects: true }) : t(text);
}

interface WorkplaceJobsProps {
  recentJobsList: Page<Job>;
}

const LocationJobs: NextPage<{ pageProps: { companyInfo: Company } }> = ({ pageProps }: { pageProps: { companyInfo: Company } }) => {
  const workplaceId: any = +useRouter().query?.id;
  const [data, setData] = useState<WorkplaceJobsProps>({ recentJobsList: null })
  const [isLoading, setLoading] = useState(true)
  const workplace = pageProps.companyInfo.workplaces.find((workplace: Workplace) => workplace.id === workplaceId);
  useEffect(() => {
    if (!workplaceId || !workplace) { Router.push(`/locations`) };
    ApplyDynamicStyles(pageProps.companyInfo.attributes.primaryColor, pageProps.companyInfo.careers?.style);
    async function getJobsData() {
      const recentJobsList = await getRecentJobs(pageProps.companyInfo.id);
      setData({ recentJobsList });
      setLoading(false);
    }
    getJobsData();
  }, [])
  return (
    <>
      {workplace &&
        <>
          <Header company={pageProps.companyInfo} title={Translate('locations')} />
          <Navbar company={pageProps.companyInfo} transparent={true} url='locations' />
          <Banner picture={workplace.attributes.pictures ? workplace.attributes.pictures[0] : null} tagline={Translate('locations')} title={workplace.attributes.name} height={BannerHeight.mediumScreen} />
          <RecentJobs recentJobsList={data.recentJobsList} company={pageProps.companyInfo.attributes.name} workplace={workplaceId} loading={isLoading} />
          <AboutCompany {...pageProps.companyInfo} />
          <Footer />
        </>
      }
    </>
  )
};


export const getServerSideProps = async ({ req }: any) => {
  const wildcard = getWildcardCode(req.headers.host);
  const companyInfo = await getCompanyInfo(wildcard);
  const translations = await serverSideTranslations(companyInfo.careers?.languageCode ?? 'en', ["common"]);

  let result = SSRCheck(companyInfo, translations);
  if (companyInfo?.departments?.length <= 0 || !companyInfo?.careers?.published) {
    result = {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return result
};

export default LocationJobs;