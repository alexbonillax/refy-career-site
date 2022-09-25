import { getCompanyInfo, getTenantCode } from '../../../services'
import { NextPage } from 'next';
import { Header } from '../../../components/header';
import { Divider, Navbar } from '../../../components';
import { getJobDetails } from '../../../services/getJobDetails';
import Job from '../../../services/models/job';
import { bucketXL } from '../../../services/urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faHandshake, faMapMarkerAlt, faScreenUsers } from '@fortawesome/pro-regular-svg-icons';
import { faArrowUpRightFromSquare } from "@fortawesome/pro-solid-svg-icons";
import { faArrowDown, faClock, faCoin } from '@fortawesome/pro-light-svg-icons';
import { DateToTimeLeftReduced } from '../../../utils/dateToTimeLeftReduced';
import AboutCompany from '../../../components/about';
import { useTranslation } from 'next-i18next';
import Company from '../../../services/models/company';
import { ButtonBasic } from '../../../components/buttons/button-basic';
import 'react-toastify/dist/ReactToastify.css';
import { FloatingContainer } from '../../../components/floating-container';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Footer from '../../../components/footer';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { LoadingPage } from '../../../components/loading-page';
import i18next from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { numberWithCommas } from '../../../utils';
import { BottomSnackbar } from '../../../components/snackbar';


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

  return (
    <section id="cover"
      className="background-color--dark background-center"
      style={{ backgroundImage: picUrl ? `url(${picUrl})` : '' }}>
      <div className="relative flex-column flex-align-justify-center background-color--blurr-dark">
        <div className="mobile-container flex-column flex-justify-center flex-align-center px-3 mobile:py-40 desktop:h-screen text-center">
          <p className="font-title font--white">{company.attributes.name}</p>
          <p className="font-big-title desktop:text-4xl mobile:text-3xl font--white mt-3 mb-3">{jobDetails.attributes.title}</p>
          <div className="flex flex-wrap flex-justify-center">
            {
              jobDetails.department &&
              <>
                <div className='flex items-center w-2 h-3 mr-2 font--white'> <FontAwesomeIcon icon={faScreenUsers} /> </div>
                <p className="flex flex-align-center font-hint font--white mr-3">
                  {jobDetails.department.attributes.name}
                </p>
              </>
            }
            {
              jobDetails.workplaces[0] &&
              <>
                <div className='flex items-center w-2 h-3 mr-1 font--white'> <FontAwesomeIcon icon={faMapMarkerAlt} /> </div>
                <p className="flex flex-align-center font-hint font--white mr-3">
                  {jobDetails.workplaces[0].attributes.areaName}
                </p>
              </>
            }
            {
              jobDetails.attributes.createdAt &&
              <>
                <div className='flex items-center w-2 h-3 mr-1 font--white'> <FontAwesomeIcon icon={faCalendarAlt} /> </div>
                <p className="flex flex-align-center font-hint font--white whitespace-nowrap">
                  {DateToTimeLeftReduced(jobDetails.attributes.createdAt)}
                </p>
              </>

            }

          </div>
          <div className="mt-4">
            <ApplyButton color={company.attributes.primaryColor} onClick={onClick} />
          </div >
        </div >
        <div className="absolute bottom-0 left-0 right-0 flex flex-justify-center pt-2 pb-3">
          <div className='noselect relative button--underline button--underline-white size-small flex items-center cursor-pointer whitespace-nowrap' onClick={scrollToDescription}>
            <p className='cursor-pointer font--white font-black button-hover--underline button-hover--underline-white'>{t('job.go-down')}</p>
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
            <p className="font-subtitle mt-3 mb-1">{t('job.conditions.title')}</p>
            <div className="flex-column space-y-3">
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
  companyInfo: Company;
  jobDetails: Job;
}

const ApplyButton = ({ color, onClick }: { color: string, onClick:() => void }) => {
  const { t } = useTranslation("common");

  return (
    <ButtonBasic classes='button-title box-shadow-container--elevated' bgColor={color} onClick={onClick}>
      {t('job.apply.button')}
      <div className='w-2 h-2 flex items-center justify-center ml-1'>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare}></FontAwesomeIcon>
      </div>
    </ButtonBasic>
  )
}

const Job: NextPage<JobProps> = () => {
  const { t } = useTranslation("common");
  const [data, setData] = useState<JobProps>({ companyInfo: null, jobDetails: null });
  const [isLoading, setLoading] = useState(true);
  const snackbarRef = useRef(null);
  const jobId: any = useRouter().query?.id as any

  useEffect(() => {
    if (!jobId) { return; }
    async function getJobsData() {
      const companyInfo = await getCompanyInfo(getTenantCode(window.location.hostname));
      const jobDetails = await getJobDetails(jobId);
      setData({ companyInfo, jobDetails });
      setLoading(false);
    }
    getJobsData();
  }, [jobId])

  return (
    <>
      {(!isLoading) &&
        <>
          {
            data.jobDetails.attributes &&
            <>
              <Header company={data.companyInfo} title={data.jobDetails.attributes.title} />
              <Navbar transparent={true} url='jobs' company={data.companyInfo} />
              <JobBanner jobDetails={data.jobDetails} company={data.companyInfo} onClick={() => snackbarRef.current.handleClick()} referralCode={jobId} />
              <JobDetails job={data.jobDetails} />
              <AboutCompany {...data.companyInfo} />
              <Footer />
              <FloatingContainer>
                <ApplyButton color={data.companyInfo.attributes.primaryColor} onClick={() => snackbarRef.current.handleClick()} />
              </FloatingContainer>
              <BottomSnackbar ref={snackbarRef} />
            </>
          }
          {
            !data.jobDetails.attributes &&
            <div className='flex items-center justify-center shado'>
              <h1>WRONG JOB CODE</h1>
            </div>
          }

        </>
      }
      {(isLoading) && <LoadingPage />}
    </>

  )
};

export default Job