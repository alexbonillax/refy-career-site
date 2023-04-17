import { getCompanyInfo, getTenantCode } from '../../../services'
import { NextPage } from 'next';
import { Header } from '../../../components/header';
import { Divider, Navbar } from '../../../components';
import { getJobDetails, getReferredJobDetails } from '../../../services/getJobDetails';
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
import { Coworkers } from '../../people';
import { isReferralCode } from '../../../utils/is-referral-code';
import { RefierCard } from '../../../components/lists/cards/refier-card';

const scrollToDescription = (): void => window.scrollTo({ top: document.getElementById('cover').scrollHeight, behavior: 'smooth' });

const applyJob = (referralCode: string) => {
  const code = isReferralCode(referralCode) ? referralCode : localStorage.getItem(referralCode);
  const tenantCode = getTenantCode(window.location.hostname);
  window.open(`https://${tenantCode}.refyapp.com/careers/jobs/apply/${code}`, '_blank');
}

export const ReferrerSection = ({ jobDetails, company, color }: { jobDetails: Job, company: string, color: string }) => {
  const { t } = useTranslation("common");
  return (
    <section id="about-company" className="py-10 background-color--grey--0">
      <div className="mobile-container px-3">
        <h1 className="font-big-title text-center mb-5">{t('job.apply.refier.title', { company })}</h1>
        <RefierCard user={jobDetails.referrerUser} />
      </div>
    </section>
  )
}

interface JobBannerProps {
  jobDetails: Job,
  company: Company;
  referralCode: string;
  onClick?: () => void;
}

const getJob = async (jobId: string, tenantCode: string): Promise<Job> => {
  let jobDetails;
  if (isReferralCode(jobId)) {
    jobDetails = await getReferredJobDetails(jobId, tenantCode);
    jobDetails.referrerUser?.id ? localStorage.setItem(jobDetails.id.toString(), jobId) : localStorage.removeItem(jobDetails.id.toString())
  } else {
    if (localStorage.getItem(jobId)) {
      jobDetails = await getReferredJobDetails(localStorage.getItem(jobId), tenantCode);
    } else {
      jobDetails = await getJobDetails(+jobId, tenantCode);
    }
  }
  return jobDetails;
}

export const JobBanner = ({ jobDetails, company, onClick }: JobBannerProps) => {
  const picUrl = jobDetails.attributes.picture ? bucketXL + jobDetails.attributes.picture : false;
  const { t } = useTranslation("common");

  const JobSection = ({ text, icon }: { text: string, icon: IconProp }) => (
    <>
      <div className='flex items-center justify-center w-2 h-2 mr-1'>
        <FontAwesomeIcon icon={icon} className='icon-font icon-font--normal icon-font--light' />
      </div>
      <p className="flex flex-align-center font-hint font--light mr-3">
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
          <p className="font-title font--light">{company?.attributes.name}</p>
          <p className="font-big-title font--light mt-3 mb-3">{jobDetails.attributes.title}</p>
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
          <div className='noselect relative flex flex-align-center button button--underline button--underline-light cursor-pointer' onClick={scrollToDescription}>
            <p className='font--light'>{t('job.go-down')}</p>
            <FontAwesomeIcon className="icon-font icon-font--normal icon-font--light ml-1" icon={faArrowDown} />
          </div>
        </div >
      </div >
    </section >
  )
}

interface JobDetailsProps {
  job: Job;
}

const JobDetailsItem = ({ title, value, icon }: { title: string, value: string, icon: IconProp }) => (
  <div className="flex flex-align-center">
    <div className='w-2 h-2 flex items-center justify-center mr-1 icon-font--normal'>
      <FontAwesomeIcon icon={icon} className="icon-font icon-font--normal icon-font--grey-1000" />
    </div>
    <div className="flex flex-align-center flex-justify-between full-width">
      <p className="font-multiline font--grey-1000">{title}</p>
      <p className="font-multiline">{value}</p>
    </div>
  </div>
)

export const JobDetailsSection = ({ job }: JobDetailsProps) => {
  i18next.use(intervalPlural);
  const { t } = useTranslation("common");

  return (
    <section id="job-details" className="py-10 background-color--white">
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
                <JobDetailsItem title={t('job.type.title')} value={t('job.type_interval', { postProcess: 'interval', count: job.attributes.employmentType })} icon={faHandshake} />
              }
              {
                job.attributes.maxSalary &&
                <JobDetailsItem title={t('job.salary.title')} value={`${numberWithCommas(job.attributes.minSalary)} - ${numberWithCommas(job.attributes.maxSalary)} ${t('job.salary_interval', { postProcess: 'interval', count: job.attributes.salaryCurrencyId })}`} icon={faCoin} />
              }
              {
                job.attributes.salaryFrequency &&
                <JobDetailsItem title={t('job.frequency.title')} value={t('job.frequency_interval', { postProcess: 'interval', count: job.attributes.salaryFrequency })} icon={faClock} />
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
  canApply: boolean;
}

const ApplyButton = ({ onClick, classes }: { onClick: () => void, classes?: string }) => {
  const { t } = useTranslation("common");

  return (
    <ButtonBasic classes={`button-title ${classes}`} onClick={onClick}>
      {t('job.apply.button')}
      <div className='w-2 h-2 flex items-center justify-center ml-1'>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="icon-font icon-font--normal"></FontAwesomeIcon>
      </div>
    </ButtonBasic>
  )
}

const JobDetails: NextPage<{ wildcard: string }> = ({ wildcard }: { wildcard: string }) => {
  const { t } = useTranslation("common");
  const [data, setData] = useState<JobProps>({ jobDetails: null, canApply: false });
  const [isLoading, setLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState<Company>(null);
  const snackbarRef = useRef(null);
  let jobId: any = useRouter().query?.id as any

  useEffect(() => {
    if (!jobId) { return; }
    async function getJobsData() {
      const jobDetails = await getJob(jobId, wildcard);
      if (jobDetails.id) {
        setData({ jobDetails, canApply: !!jobDetails.referrerUser?.id });
        setLoading(false);
      } else {
        Router.push(`/jobs?unknown`);
      };
    }
    async function getCompany() {
      const company = (await getCompanyInfo(wildcard));
      setCompanyInfo(company);
      ApplyDynamicStyles(company);
    }
    getCompany();
    getJobsData();
  }, [jobId])

  return (
    <>
      {(!isLoading) &&
        <>
          {
            (data.jobDetails.attributes) &&
            <>
              <Header company={companyInfo} title={data.jobDetails.attributes.title} />
              {companyInfo && <Navbar transparent={true} url='jobs' company={companyInfo} />}
              <JobBanner jobDetails={data.jobDetails} company={companyInfo} onClick={() => data.canApply ? applyJob(jobId) : snackbarRef.current.handleClick(t('toast.apply.warning'))} referralCode={jobId} />
              <JobDetailsSection job={data.jobDetails} />
              {
                data.canApply &&
                <ReferrerSection jobDetails={data.jobDetails} company={companyInfo?.attributes.name} color={companyInfo?.attributes.primaryColor} />
              }
              {
                (companyInfo?.careers?.referrers?.visible && data.jobDetails.department?.employees?.length > 0) &&
                <Coworkers employees={data.jobDetails.department.employees} />
              }
              {companyInfo && <AboutCompany {...companyInfo} />}
              <Footer />
              <FloatingContainer>
                <ApplyButton classes='button--floating box-shadow-container--elevated' onClick={() => data.canApply ? applyJob(jobId) : snackbarRef.current.handleClick(t('toast.apply.warning'))} />
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
      {(isLoading) && <LoadingPage fill={companyInfo?.attributes?.primaryColor} />}
    </>

  )
};

export const getServerSideProps = async ({ req }: any) => {
  const wildcard = getWildcardCode(req.headers.host);
  const companyInfo = await getCompanyInfo(wildcard);
  const translations = await serverSideTranslations(companyInfo.careers?.languageCode ?? 'en', ["common"]);
  return {
    props: {
      wildcard,
      _nextI18Next: translations._nextI18Next,
    }
  }
};

export default JobDetails