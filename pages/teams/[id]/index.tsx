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
import { SSRCheck } from "../../../utils/redirects";
import { Coworkers } from "../../people";

export const Translate = (text: string, options?: any): string => {
  const { t } = useTranslation("common");
  return options ? t(text, options) : t(text);
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
    ApplyDynamicStyles(pageProps.companyInfo);
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
          <Banner
              picture={department.attributes.pictures ? department.attributes.pictures[0] : null}
              tagline={Translate('teams')} title={department.attributes.name}
              height={BannerHeight.smallScreen}
              backButton={{ url: '/teams', text: Translate('back-to', { page: Translate('teams')}) }}
          />
          <RecentJobs recentJobsList={data.recentJobsList} company={pageProps.companyInfo} loading={isLoading} />
          {
            (pageProps.companyInfo.careers?.referrers?.visible && department.employees.length > 0) &&
            <Coworkers employees={department.employees} />
          }
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

export default TeamJobs;