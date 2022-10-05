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
import Department from "../../../services/models/department";
import Router from 'next/router';
import { ApplyDynamicStyles } from "../../../utils/dynamic-styles/apply-styles";

export const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("common");
  return array ? t(text, { returnObjects: true }) : t(text);
}

interface TeamJobsProps {
  recentJobsList: Page<Job>;
  teamName: string;
}

const TeamJobs: NextPage<{ pageProps: { companyInfo: Company } }> = ({ pageProps }: { pageProps: { companyInfo: Company } }) => {
  const departmentId = +useRouter().query?.id;
  const [data, setData] = useState<TeamJobsProps>({ recentJobsList: null, teamName: null })
  const [isLoading, setLoading] = useState(true)
  const department = pageProps.companyInfo.departments.find((dept: Department) => dept.id === departmentId);
  useEffect(() => {
    if (!departmentId || !department) { Router.push(`/teams`) };
    ApplyDynamicStyles(pageProps.companyInfo.careers?.style);
    async function getJobsData() {
      const recentJobsList = await getRecentJobs(pageProps.companyInfo.id, departmentId);
      const teamName = pageProps.companyInfo.departments.find((dept: Department) => dept.id === +departmentId)?.attributes.name;
      setData({ recentJobsList, teamName });
      setLoading(false);
    }
    getJobsData();
  }, [])
  return (
    <>
      {department &&
        <>
          <Header company={pageProps.companyInfo} title={Translate('teams')} />
          <Navbar company={pageProps.companyInfo} transparent={true} url='teams' />
          <Banner picture={department.attributes.picture} tagline={Translate('teams')} title={department.attributes.name} height={BannerHeight.mediumScreen} />
          <RecentJobs recentJobsList={data.recentJobsList} loading={isLoading} />
          <AboutCompany {...pageProps.companyInfo} />
          <Footer />
        </>
      }
    </>
  )
};


export const getServerSideProps = async ({ locale, req }: any) => {
  const translations = await serverSideTranslations(locale, ["common"]);
  const wildcard = getWildcardCode(req.headers.host);
  const companyInfo = await getCompanyInfo(wildcard);

  if (companyInfo.departments.length > 0) {
    return {
      props: {
        _nextI18Next: translations._nextI18Next,
        pageProps: {
          companyInfo,
        }
      }
    };
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
};

export default TeamJobs;