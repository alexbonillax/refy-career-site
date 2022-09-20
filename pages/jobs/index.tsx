import { faMapMarkerAlt, faScreenUsers } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Navbar } from "../../components";
import AboutCompany from "../../components/about";
import Footer from "../../components/footer";

import { Header } from "../../components/header";
import { getCompanyInfo, getRecentJobs } from "../../services";
import Job from "../../services/models/job";
import Page from "../../services/models/page";
import { bucketL } from "../../services/urls";

interface RecentJobsProps {
  recentJobsList: Page<Job>;
  workplace?: number;
  loading: boolean;
}

export const RecentJobs = ({ recentJobsList, workplace, loading = true }: RecentJobsProps) => {
  const { t } = useTranslation("common");
  let jobs = recentJobsList?.content;
  if (workplace) {
    jobs = recentJobsList?.content.filter(job => job.overview.workplaces.some(wp => wp.id === +workplace));
  }
  return (
    <section id="department-jobs" className="bg-white">
      <div className="mobile-container--responsive m-auto flex-col px-1 py-10">
        <h1 className="font-big-title text-center desktop:text-4xl mobile:text-3xl">{t('jobs.available')}</h1>
        <h2 className="font-subtitle text-center mt-1">{t('jobs.find', { company: 'Refy' })}</h2>
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
            <h1>{`Theres actually not jobs in this area 😢`}</h1>
          }
          {
            loading && Array.from(Array(6)).map((_, i) =>
              <div className="p-1 w-m--100 w-d--33" key={i}>
                <JobCardLoading />
              </div>
            )

          }
        </div>
      </div>
    </section>
  )
};

const JobCardLoading = () => (
  <div className="w-full flex-column box-shadow-container--card br-1 my-2">
    <div className="h-30 flex-column flex-justify-between py-2 px-2 background-loading-gradient background-loading-gradient--rect"></div>

    <div className="flex-column py-1 px-2">
      <div className="h-4 flex flex-align-center">
        <div className="h-3 full-width background-loading-gradient"></div>
      </div>
    </div>

    <div className="flex flex-col flex-align-center flex-justify-between pt-1 pb-2 px-2 h-9">
      <div className="flex">
        <div className="h-2 w-2 background-loading-gradient"></div>
        <div className="h-2 w-10 background-loading-gradient ml-1"></div>
      </div>
      <div className="flex">
        <div className="h-2 w-2 background-loading-gradient"></div>
        <div className="h-2 w-10 background-loading-gradient ml-1"></div>
      </div>
    </div>
  </div >
)

const JobCard = (job: Job) => {
  const picUrl = job.attributes.picture ? bucketL + job.attributes.picture : false;
  return (
    <Link href={`/jobs/${job.id}`}>
      <a>
        <div className="flex-column text-center box-shadow-container--card br-1 overflow-hidden flex-align-center background-color--white cursor-pointer">
          <div className="flex h-30 full-width background-center" style={picUrl ? { backgroundImage: `url(${picUrl})` } : {}}>
            <div className="flex-column flex-align-justify-center full-width full-height background-color--blurr-dark"></div>
          </div>
          <div className="flex-column py-2 px-3">
            <p className="flex h-8 font-title">{job.attributes.title}</p>
            <div className="flex flex-wrap flex-justify-center h-3 mb-1">
              {
                job.overview?.department &&
                <p className="flex flex-align-center font-hint mr-3">
                  <FontAwesomeIcon icon={faScreenUsers} className="mr-1 font-icon color-primary"></FontAwesomeIcon>
                  {job.overview.department.name}
                </p>
              }
              {
                job.overview?.workplaces.length > 0 &&
                <p className="flex flex-align-center font-hint mr-3">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1 font-icon color-primary"></FontAwesomeIcon>
                  {job.overview.workplaces[0].areaName || ''}
                </p>
              }
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

interface JobsProps {
  recentJobsList: Page<Job>,
}

const Jobs: NextPage = ({ pageProps }: any) => {
  const { t } = useTranslation("common");
  const workplaceId = +useRouter().query?.workplace;
  const [data, setData] = useState<JobsProps>({ recentJobsList: null })
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    async function getJobsData() {
      const recentJobsList = await getRecentJobs(pageProps.companyInfo.id);
      setData({ recentJobsList });
      setLoading(false);
    }
    getJobsData();
  }, [])


  return (
    <>
      <Header company={pageProps.companyInfo} title={t('jobs')} />
      <div className="pt-8">
        <Navbar logoUrl={pageProps.companyInfo.attributes.logo} url='jobs' companyUrl={pageProps.companyInfo.attributes.site} color={pageProps.companyInfo.attributes.primaryColor} />
        <RecentJobs recentJobsList={data.recentJobsList} workplace={workplaceId} loading={isLoading} />
        <AboutCompany {...pageProps.companyInfo} />
        <Footer />
      </div>
    </>
  )
};

export const getServerSideProps = async ({ locale, req }: any) => {
  const translations = await serverSideTranslations(locale, ["common"]);
  const wildcard = (process.env.NODE_ENV != "development" && req.headers.host.includes(process.env.WEBSITE_URL)) ? req.headers.host.split(".")[0] : 'refy';
  const companyInfo = await getCompanyInfo(wildcard);
  return {
    props: {
      _nextI18Next: translations._nextI18Next,
      pageProps: {
        companyInfo,
      }
    }
  };
};

export default Jobs;