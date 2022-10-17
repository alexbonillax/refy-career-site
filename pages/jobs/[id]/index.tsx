import { getCompanyInfo } from '../../../services'
import { NextPage } from 'next';
import { Header } from '../../../components/header';
import { Divider, Navbar } from '../../../components';
import { getJobDetails } from '../../../services/getJobDetails';
import Job from '../../../services/models/job';
import { bucketXL } from '../../../services/urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faScreenUsers } from '@fortawesome/pro-regular-svg-icons';
import { faArrowUpRightFromSquare } from "@fortawesome/pro-solid-svg-icons";
import { faArrowDown, faClock, faCoin, faHandshake } from '@fortawesome/pro-light-svg-icons';
import { DateToTimeLeftReduced } from '../../../utils/dateToTimeLeftReduced';
import AboutCompany from '../../../components/about';
import { useTranslation } from 'next-i18next';
import Company from '../../../services/models/company';
import { ButtonBasic } from '../../../components/buttons/button-basic';
import 'react-toastify/dist/ReactToastify.css';
import { FloatingContainer } from '../../../components/floating-container';
import { useEffect, useRef, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Footer from '../../../components/footer';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { LoadingPage } from '../../../components/loading-page';
import i18next from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { numberWithCommas } from '../../../utils';
import { BottomSnackbar } from '../../../components/snackbar';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getWildcardCode from '../../../utils/wildcard';
import { ApplyDynamicStyles } from '../../../utils/dynamic-styles/apply-styles';
import { SSRCheck } from '../../../utils/redirects';
import { Coworkers } from '../../people';


const scrollToDescription = (): void => window.scrollTo({ top: document.getElementById('cover').scrollHeight, behavior: 'smooth' });

interface JobBannerProps {
  jobDetails: Job,
  company: Company;
  referralCode: string;
  onClick?: () => void;
}

export const JobBanner = ({ jobDetails, company, onClick }: JobBannerProps) => {
  const picUrl = jobDetails.attributes.picture ? bucketXL + jobDetails.attributes.picture : false;
  const { t } = useTranslation("common");

  const JobSection = ({ text, icon }: { text: string, icon: IconProp }) => (
    <>
      <div className='flex items-center justify-center w-2 h-2 mr-1 text-white'>
        <FontAwesomeIcon icon={icon} />
      </div>
      <p className="flex flex-align-center font-hint font--white mr-3">
        {text}
      </p>
    </>
  )

  return (
    <section id="cover"
      className="background-color--dark background-center"
      style={{ backgroundImage: picUrl ? `url(${picUrl})` : '' }}>
      <div className="relative flex-column flex-align-justify-center background-color--blurr-dark">
        <div className="mobile-container flex-column flex-justify-center flex-align-center px-3 mobile:py-40 desktop:h-screen text-center">
          <p className="font-title font--white">{company.attributes.name}</p>
          <p className="font-big-title desktop:text-4xl mobile:text-3xl font--white mt-3 mb-3">{jobDetails.attributes.title}</p>
          <div className="flex flex-wrap items-center justify-center">
            {
              jobDetails.department &&
              <JobSection text={jobDetails.department.attributes.name} icon={faScreenUsers} />
            }
            {
              jobDetails.workplaces[0] &&
              <JobSection text={jobDetails.workplaces[0].attributes.areaName} icon={faMapMarkerAlt} />
            }
            {
              jobDetails.attributes.createdAt &&
              <JobSection text={DateToTimeLeftReduced(jobDetails.attributes.createdAt)} icon={faCalendarAlt} />
            }

          </div>
          <div className="mt-4">
            <ApplyButton onClick={onClick} />
          </div >
        </div >
        <div className="absolute bottom-0 left-0 right-0 flex flex-justify-center pt-2 pb-3">
          <div className='noselect relative button button--underline button--underline-white size-small flex items-center cursor-pointer whitespace-nowrap' onClick={scrollToDescription}>
            <p className='cursor-pointer font--white button-hover--underline button-hover--underline-white'>{t('job.go-down')}</p>
            <FontAwesomeIcon className="font--white ml-1" icon={faArrowDown} />
          </div>
        </div >
      </div >
    </section >
  )
}

interface JobDetailsProps {
  job: Job;
}

const SectionJobDetails = ({ title, value, icon }: { title: string, value: string, icon: IconProp }) => (
  <div className="flex flex-align-center">
    <div className='w-2 h-2 flex items-center justify-center mr-1'>
      <FontAwesomeIcon icon={icon} />
    </div>
    <div className="flex flex-align-center flex-justify-between full-width">
      <p className="font-multiline font--dark">{title}</p>
      <p className="font-multiline">{value}</p>
    </div>
  </div>
)

export const JobDetails = ({ job }: JobDetailsProps) => {
  i18next.use(intervalPlural);
  const { t } = useTranslation("common");

  return (
    <section id="job-details" className="py-10">
      <div className="flex-column mobile-container px-3">
        <div className="font-prose mb-3" dangerouslySetInnerHTML={{ __html: job.attributes.description }}></div>
        <Divider />
        {
          (job.attributes.employmentType || job.attributes.maxSalary) &&
          <div className="flex-column">
            <p className="font-subtitle mt-3 mb-2">{t('job.conditions.title')}</p>
            <div className="flex-column space-y-6">
              {
                job.attributes.employmentType &&
                <SectionJobDetails title={t('job.type.title')} value={t('job.type_interval', { postProcess: 'interval', count: job.attributes.employmentType })} icon={faHandshake} />
              }
              {
                job.attributes.maxSalary &&
                <SectionJobDetails title={t('job.salary.title')} value={`${numberWithCommas(job.attributes.minSalary)} - ${numberWithCommas(job.attributes.maxSalary)} ${t('job.salary_interval', { postProcess: 'interval', count: job.attributes.salaryCurrencyId })}`} icon={faCoin} />
              }
              {
                job.attributes.salaryFrequency &&
                <SectionJobDetails title={t('job.frequency.title')} value={t('job.frequency_interval', { postProcess: 'interval', count: job.attributes.salaryFrequency })} icon={faClock} />
              }
            </div>
          </div>
        }

      </div>
    </section>
  )
}

export interface JobProps {
  jobDetails: Job;
}

const ApplyButton = ({ onClick, classes }: { onClick: () => void, classes?: string }) => {
  const { t } = useTranslation("common");

  return (
    <ButtonBasic classes={`button-title ${classes}`} onClick={onClick}>
      {t('job.apply.button')}
      <div className='w-2 h-2 flex items-center justify-center ml-1'>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare}></FontAwesomeIcon>
      </div>
    </ButtonBasic>
  )
}

const Job: NextPage<{ pageProps: { companyInfo: Company } }> = ({ pageProps }: { pageProps: { companyInfo: Company } }) => {
  const { t } = useTranslation("common");
  const [data, setData] = useState<JobProps>({ jobDetails: null });
  const [isLoading, setLoading] = useState(true);
  const snackbarRef = useRef(null);
  const jobId: any = useRouter().query?.id as any

  useEffect(() => {
    if (!jobId) { return; }
    async function getJobsData() {
      ApplyDynamicStyles(pageProps.companyInfo.attributes.primaryColor, pageProps.companyInfo.careers?.style);
      const jobDetails = await getJobDetails(jobId, pageProps.companyInfo.id);
      if (!jobDetails.id) {
        Router.push(`/jobs?unknown`);
      } else {
        setData({ jobDetails });
        setLoading(false);
      };
    }
    getJobsData();
  }, [jobId])

  return (
    <>
      {(!isLoading) &&
        <>
          {
            (data.jobDetails.attributes && pageProps.companyInfo) &&
            <>
              <Header company={pageProps.companyInfo} title={data.jobDetails.attributes.title} />
              <Navbar transparent={true} url='jobs' company={pageProps.companyInfo} />
              <JobBanner jobDetails={data.jobDetails} company={pageProps.companyInfo} onClick={() => snackbarRef.current.handleClick(t('toast.apply.warning'))} referralCode={jobId} />
              <JobDetails job={data.jobDetails} />
              {
                (pageProps.companyInfo.careers?.referrers?.visible && data.jobDetails.department?.employees.length > 0) &&
                <Coworkers employees={data.jobDetails.department.employees}/>
              } 
              <AboutCompany {...pageProps.companyInfo} />
              <Footer />
              <FloatingContainer>
                <ApplyButton classes='button--floating box-shadow-container--elevated' onClick={() => snackbarRef.current.handleClick(t('toast.apply.warning'))} />
              </FloatingContainer>
              <BottomSnackbar ref={snackbarRef} />
            </>
          }
          {
            !data.jobDetails.attributes &&
            <div className='flex items-center justify-center'>
              <h1>WRONG JOB CODE</h1>
            </div>
          }

        </>
      }
      {(isLoading) && <LoadingPage fill={pageProps.companyInfo.attributes?.primaryColor} />}
    </>

  )
};

export const getServerSideProps = async ({ req }: any) => {
  const wildcard = getWildcardCode(req.headers.host);
  const companyInfo = await getCompanyInfo(wildcard);
  const translations = await serverSideTranslations(companyInfo.careers?.languageCode ?? 'en', ["common"]);
  return SSRCheck(companyInfo, translations);
};

export default Job