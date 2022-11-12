import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "../../components";
import AboutCompany from "../../components/about";
import Footer from "../../components/footer";
import { Header } from "../../components/header";
import BottomSnackbar from "../../components/snackbar";
import { getCompanyInfo, getRecentJobs } from "../../services";
import Company from "../../services/models/company";
import Job from "../../services/models/job";
import Page from "../../services/models/page";
import { ApplyDynamicStyles } from "../../utils/dynamic-styles/apply-styles";
import getWildcardCode from "../../utils/wildcard";
import { SSRCheck } from "../../utils/redirects";
import { JobFilterList } from "../../components/lists/job-filter-list";

const Jobs: NextPage<{ pageProps: { companyInfo: Company } }> = ({ pageProps }: { pageProps: { companyInfo: Company } }) => {
  const { t } = useTranslation("common");
  const snackbarRef = useRef(null);
  const workplaceId = +useRouter().query?.workplace;
  ('unknown' in useRouter().query) && snackbarRef.current?.handleClick(t('job.not-exist'));
  useEffect(() => {
    ApplyDynamicStyles(pageProps.companyInfo);
  }, [])


  return (
    <>
      <Header company={pageProps.companyInfo} title={t('jobs')} />
      <Navbar url='jobs' company={pageProps.companyInfo} />
      <JobFilterList company={pageProps.companyInfo} workplace={workplaceId} />
      <AboutCompany {...pageProps.companyInfo} />
      <Footer />
      <BottomSnackbar ref={snackbarRef} />
    </>
  )
};

export const getServerSideProps = async ({ req }: any) => {
  const wildcard = getWildcardCode(req.headers.host);
  const companyInfo = await getCompanyInfo(wildcard);
  const translations = await serverSideTranslations(companyInfo.careers?.languageCode ?? 'en', ["common"]);
  return SSRCheck(companyInfo, translations);
};

export default Jobs;