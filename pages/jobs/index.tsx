import { faMapMarkerAlt, faScreenUsers } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { Navbar } from "../../components";
import AboutCompany from "../../components/about";

import { Header } from "../../components/header";

import { getCompanyInfo, getRecentJobs } from "../../services";
import Job from "../../services/models/job";
import Page from "../../services/models/page";
import { bucketL } from "../../services/urls";
import { Translate } from "../locations";

interface RecentJobsProps {
  recentJobsList: Page<Job>;
  workplace?: number;
}

export const RecentJobs = ({recentJobsList, workplace}: RecentJobsProps) => {
  const { t } = useTranslation("common");
  let jobs = recentJobsList?.content;
  if (workplace) {
    jobs = recentJobsList?.content.filter(job => job.overview.workplaces.some(wp => wp.id === +workplace));
  }
  return (
    <section id="department-jobs" className="bg-white">
      <div className="mobile-container--responsive m-auto flex-col px-1 py-10">
        <p className="font-big-title text-center desktop:font-big-title--40">{t('jobs.available')}</p>
        <p className="font-subtitle text-center mt-1">{t('jobs.find', { company: 'Refy' })}</p>
        <div className="flex flex-wrap flex-align-justify-center mt-5">
          {
            jobs && jobs.map((job, i) => (
              <div className="p-1 w-m--100 w-d--33" key={i}>
                <JobCard {...job} />
              </div>
            ))
          }
          {
            //TODO
            (!jobs || jobs.length == 0) && 
            <h1>There's actually not jobs in this area =(</h1>
            
          }
        </div>
      </div>
    </section>
  )
};

const JobCard = (job: Job) => {
  const picUrl = job.attributes.picture ? bucketL + job.attributes.picture : false;
  return (
    <Link href={"/job/" + job.id}>
      <a>
        <div className="flex-column text-center box-shadow-container--card br-1 overflow-hidden flex-align-center background-color--white cursor-pointer">
          <div className="flex h-30 full-width background-center" style={picUrl ? { backgroundImage: `url(${picUrl})`} : {}}>
            <div className="flex-column flex-align-justify-center full-width full-height background-color--blurr-dark"></div>
          </div>
          <div className="flex-column py-2 px-3">
            <p className="flex flex-align-justify-center h-8 font-title">{job.attributes.title}</p>
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

const Jobs: NextPage = ({ pageProps }: any) => (
  <>
    <Header companyName={pageProps.companyInfo.attributes.name} title={Translate('jobs')} />
    <div className="pt-9">
      <Navbar logoUrl={pageProps.companyInfo.attributes.logo} url='jobs'/>
      <RecentJobs recentJobsList={pageProps.recentJobsList} workplace={pageProps.workplaceId} />
      <AboutCompany {...pageProps.companyInfo} />
    </div>
  </>
);


export const getServerSideProps = async ({ locale, query }: { locale: string, query: any }) => {
  const workplaceId = query?.workplace ? query.workplace : null;
  const translations = await serverSideTranslations(locale, ["common"]);
  const companyInfo = await getCompanyInfo();
  const recentJobsList = await getRecentJobs(companyInfo.id);
  return {
    props: {
      _nextI18Next: translations._nextI18Next,
      pageProps: {
        companyInfo,
        recentJobsList,
        workplaceId,
      }
    }
  };
};

export default Jobs;