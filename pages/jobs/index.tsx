import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "../../components";
import AboutCompany from "../../components/about";
import { ButtonBasic } from "../../components/buttons/button-basic";
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
import { JobCard } from "../../components/cards/job-card";
import { JobCardLoading } from "../../components/cards/loading-cards/job-loading-card";

interface RecentJobsProps {
  recentJobsList: Page<Job>;
  company: Company;
  workplace?: number;
  loading: boolean;
  reduced?: boolean;
  classes?: string;
}

export const RecentJobs = ({ recentJobsList, company, workplace, loading = true, reduced = false, classes = ''}: RecentJobsProps) => {
  const { t } = useTranslation("common");
  let jobs = recentJobsList?.content;
  if (workplace) {
    jobs = recentJobsList?.content.filter(job => job.overview.workplaces.some(wp => wp.id === +workplace));
  }
  return (
    <section id="department-jobs" className={`background-color--white ${classes}`}>
      <div className="mobile-container--responsive m-auto flex-col px-2 py-10">
        <h2 className="font-big-title text-center">{company.careers.jobs?.title || t('jobs.available')}</h2>
        <p className="font-subtitle text-center mt-2">{company.careers.jobs?.subtitle || t('jobs.find', { company: company.attributes.name })}</p>
        <div className="flex flex-wrap flex-align-justify-center mt-5">
          {
            !loading && jobs && jobs.map((job, i) => (
              <div className="p-1 w-m--100 w-d--33" key={i}>
                <JobCard {...job} />
              </div>
            ))
          }
          {
            //TODO
            (!jobs || jobs.length == 0) && !loading &&
            <h1 className="font-prose">{t('job.empty')}</h1>
          }
          {
            loading && Array.from(Array(6)).map((_, i) =>
              <div className="p-1 w-m--100 w-d--33" key={i}>
                <JobCardLoading />
              </div>
            )
          }
        </div>
        {
          reduced &&
          <div className="flex justify-center mt-2">
            <Link href="/jobs">
                <ButtonBasic classes='!py-4 !text-lg'>{t('jobs.view')}</ButtonBasic>
            </Link>
          </div>
        }
      </div>
    </section>
  )
};

interface JobsProps {
  recentJobsList: Page<Job>,
}

const Jobs: NextPage<{ pageProps: { companyInfo: Company } }> = ({ pageProps }: { pageProps: { companyInfo: Company } }) => {
  const { t } = useTranslation("common");
  const snackbarRef = useRef(null);
  const workplaceId = +useRouter().query?.workplace;
  const [data, setData] = useState<JobsProps>({ recentJobsList: null })
  const [isLoading, setLoading] = useState(true);
  ('unknown' in useRouter().query) && snackbarRef.current?.handleClick(t('job.not-exist'));
  useEffect(() => {
    async function getJobsData() {
      ApplyDynamicStyles(pageProps.companyInfo);
      const recentJobsList = await getRecentJobs(pageProps.companyInfo.id);
      setData({ recentJobsList });
      setLoading(false);
    }
    getJobsData();
  }, [])


  return (
    <>
      <Header company={pageProps.companyInfo} title={t('jobs')} />
      <Navbar url='jobs' company={pageProps.companyInfo} />
      <RecentJobs recentJobsList={data.recentJobsList} company={pageProps.companyInfo} workplace={workplaceId} loading={isLoading} />
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