import { faMapMarkerAlt, faScreenUsers } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { AboutCompany } from "../../components/about";
import { Header } from "../../components/header";
import Navbar from "../../components/navbar";
import { getCompanyInfo, getRecentJobs } from "../../services";
import Job from "../../services/models/job";
import Page from "../../services/models/page";
import { bucketL } from "../../services/urls";

export const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("jobs");
  return array ? t(text, { returnObjects: true }) : t(text);
}

export const RecentJobs = (recentJobsList: Page<Job>) => (
  <section id="department-jobs" className="bg-white">
    <div className="mobile-container--responsive m-auto flex-col px-1 py-10">
      <p className="font-big-title text-center desktop:font-big-title--40">{Translate('candidate.jobs.available')}</p>
      <p className="font-subtitle text-center mt-1">{Translate('candidate.jobs.find')}</p>
      <div className="flex flex-wrap flex-align-justify-center mt-5">
        {
          recentJobsList.content.map((job, i) => (
            <div className="p-1 w-m--100 w-d--33" key={i}>
              <JobCard {...job} />
            </div>
          ))
        }

      </div>
      <div className="flex flex-align-justify-center w-m--100 mt-2">
        <Button>{Translate('candidate.jobs.view')}</Button>
      </div>
    </div>
  </section>
);

const JobCard = (job: Job) => {
  const picUrl = job.attributes.picture ? bucketL + job.attributes.picture : false;
  return (
    <Link href={"/job/" + job.id}>
      <a>
        <div className="flex-column text-center box-shadow-container--card br-1 overflow-hidden flex-align-center background-color--white cursor-pointer">
          <div className="flex h-30 full-width background-center" style={{ backgroundImage: picUrl ? `url(${picUrl})` : '' }}>
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
    <Header name={pageProps.companyInfo.attributes.name} />
    <div className="pt-9">
      <Navbar logoUrl={pageProps.companyInfo.attributes.logo} />
      <RecentJobs {...pageProps.recentJobsList} />
      <AboutCompany {...pageProps.companyInfo} />
    </div>
  </>
);


export const getStaticProps = async ({ locale }: { locale: string }) => {
  const translations = await serverSideTranslations(locale, ["common", "home"]);
  const companyInfo = await getCompanyInfo();
  const recentJobsList = await getRecentJobs(companyInfo.id);
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

export default Jobs;