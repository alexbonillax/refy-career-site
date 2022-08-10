import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getCompanyInfo } from '../../../services'
import { NextPage } from 'next';
import { Header } from '../../../components/header';
import Navbar from '../../../components/navbar';
import { AboutCompany, Divider } from '../../../components';
import { getJobDetails } from '../../../services/getJobDetails';
import { Job } from '../../../services/models';
import { bucketXL } from '../../../services/urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCalendarAlt, faHandshake, faMapMarkerAlt, faScreenUsers } from '@fortawesome/pro-regular-svg-icons';
import dayjs from 'dayjs';
import { faCoin, faStopwatch } from '@fortawesome/pro-light-svg-icons';

const Banner = (jobDetails: Job) => {
  const picUrl = jobDetails.attributes.picture ? bucketXL + jobDetails.attributes.picture : false;
  return (
    <section id="cover"
      className="background-color--dark background-center"
      style={{ backgroundImage: picUrl ? `url(${picUrl})` : '' }}>
      <div className="relative flex-column flex-align-justify-center background-color--blurr-dark">
        <div className="mobile-container flex-column flex-justify-center flex-align-center px-3 py-20 text-center">
          <p className="font-title font--white">{jobDetails.attributes.title}</p>
          <p className="font-big-title font--white mt-3 mb-3 mobile:font-big-title--40 desktop:font-big-title--46">{jobDetails.attributes.title}</p>
          <div className="flex flex-wrap flex-justify-center">
            {
              jobDetails.department &&
              <p className="flex flex-align-center font-hint font--white mr-3">
                <FontAwesomeIcon icon={faScreenUsers} className="mr-1" />
                {jobDetails.department.attributes.name}
              </p>
            }
            {
              jobDetails.workplaces[0] &&
              <p className="flex flex-align-center font-hint font--white mr-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                {jobDetails.workplaces[0].attributes.areaName}
              </p>
            }
            {
              jobDetails.attributes.createdAt &&
              <p className="flex flex-align-center font-hint font--white">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                {dayjs(jobDetails.attributes.createdAt, 'DD/MM/YYYY').toString()}
              </p>
            }

          </div>
          <div className="mt-4">
            {/* <app-button-basic
          [classes]="'button--light background-color--primary button-hover--size'"
          (click)="goToApplyJob()"
          [backgroundColor]="company.attributes.primaryColor"
        >
          {{ 'candidate-job.apply-for-job' | transloco }}
          <fa-icon *ngIf="currentJobLink$ | async" [icon]="faArrowUpRightFromSquare" className="ml-1"></fa-icon>
        </app - button - basic > */}
          </div >
        </div >
        <div className="absolute bottom-0 left-0 right-0 flex flex-justify-center py-2">
          <div>
            {/* <app-button-basic
          [size]="buttonSizeSmall"
      [classes]="'no-p button-hover--underline button-hover--underline-white'"
      (click)="scrollToSection('job-details')"
        >
      <p className="button-font--15 button--light">{{ 'scroll-down' | transloco }}</p>
      <fa-icon [icon]="faArrowDown" className="font--white ml-1"></fa-icon>
  </app-button-basic> */}
          </div >
        </div >
      </div >
    </section >
  )
}

const Details = (jobDetails: Job) => (
  <section id="job-details" className="py-10">
    <div className="flex-column mobile-container px-3">
      <div className="font-prose" dangerouslySetInnerHTML={{ __html: jobDetails.attributes.description }}></div>
      <Divider title='' />
      {
        (jobDetails.attributes.employmentType || jobDetails.attributes.maxSalary) &&
        <div className="flex-column">
          <p className="font-subtitle mb-1">{'job.edit.step-title'}</p>
          <div className="flex-column">
            {
              jobDetails.attributes.employmentType &&
              <div className="flex flex-align-center">
                <FontAwesomeIcon icon={faHandshake} className="mr-1" />
                <div className="flex flex-align-center flex-justify-between full-width">
                  <p className="font-multiline font--dark">{'manage.edit-job.employment-type.title'}</p>
                  <p
                    className="font-multiline">{'manage.edit-job.employment-type'}</p>
                </div>
              </div>
            }
            {
              jobDetails.attributes.maxSalary &&
              <div className="flex flex-align-center">
                <FontAwesomeIcon icon={faCoin} className="w-6 h-6 mr-1 icon-font" />
                <div className="flex flex-align-center flex-justify-between full-width">
                  <p className="font-multiline font--dark">{'jobs.job-details.salary-range'}</p>
                  <p className="font-multiline">{jobDetails.attributes.minSalary} - {jobDetails.attributes.maxSalary} {jobDetails.attributes.salaryCurrencyId}</p>
                </div>
              </div>
            }
            {
              jobDetails.attributes.salaryFrequency &&
              <div className="flex flex-align-center">
                <FontAwesomeIcon icon={faStopwatch} className="w-6 h-6 mr-1 icon-font" />
                <div className="flex flex-align-center flex-justify-between full-width">
                  <p className="font-multiline font--dark">{'manage.edit-job.frequency'}</p>
                  <p
                    className="font-multiline">{'manage.edit-job.pay-frequency'}</p>
                </div>
              </div>
            }
          </div>
        </div>
      }

    </div>
  </section>
)

const Job: NextPage = ({ pageProps }: any) => (
  <>
    <Header name={pageProps.companyInfo.attributes.name} />
    <div className="pt-9">
      <Navbar logoUrl={pageProps.companyInfo.attributes.logo} />
      <Banner {...pageProps.jobDetails} />
      <Details {...pageProps.jobDetails} />
      <AboutCompany {...pageProps.companyInfo} />
    </div>
  </>
);

export const getServerSideProps = async ({ locale, params }: { locale: string, params: any }) => {
  const jobId = params.id;
  const translations = await serverSideTranslations(locale, ["common", "home"]);
  const companyInfo = await getCompanyInfo();
  const jobDetails = await getJobDetails(jobId);
  return {
    props: {
      _nextI18Next: translations._nextI18Next,
      pageProps: {
        companyInfo,
        jobDetails
      }
    }
  };
};

// NOTE: In case that we want to make individual JOB pages static we need this method.

// export const getStaticPaths = async () => {
//   const companyInfo = await getCompanyInfo();
//   const recentJobsList = await getRecentJobs(companyInfo.id);
//   return {
//     paths: recentJobsList.content.map(({ id }) => `/job/${id}`) ?? [],
//     fallback: true
//   }
// };



export default Job