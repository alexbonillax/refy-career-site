import { getCompanyInfo } from '../../../services'
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FloatingContainer } from '../../../components/floating-container';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Footer from '../../../components/footer';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface JobBannerProps {
  jobDetails: Job,
  companyName: string;
  referralCode: string;
  onClick?: () => void;
}

export const JobBanner = ({ jobDetails, companyName, onClick }: JobBannerProps) => {
  const picUrl = jobDetails.attributes.picture ? bucketXL + jobDetails.attributes.picture : false;
  const { t } = useTranslation("common");

  return (
    <section id="cover"
      className="background-color--dark background-center"
      style={{ backgroundImage: picUrl ? `url(${picUrl})` : '' }}>
      <div className="relative flex-column flex-align-justify-center background-color--blurr-dark">
        <div className="mobile-container flex-column flex-justify-center flex-align-center px-3 mobile:py-40 desktop:h-screen text-center">
          <p className="font-title font--white">{companyName}</p>
          <p className="font-big-title mobile:text-4xl desktop:text-5xl font--white mt-3 mb-3">{jobDetails.attributes.title}</p>
          <div className="flex flex-wrap flex-justify-center">
            {
              jobDetails.department &&
              <>
                <div className='w-2 h-2 mr-1 font--white'> <FontAwesomeIcon icon={faScreenUsers} /> </div>
                <p className="flex flex-align-center font-hint font--white mr-3">
                  {jobDetails.department.attributes.name}
                </p>
              </>
            }
            {
              jobDetails.workplaces[0] &&
              <>
                <div className='w-2 h-2 mr-1 font--white'> <FontAwesomeIcon icon={faMapMarkerAlt} /> </div>
                <p className="flex flex-align-center font-hint font--white mr-3">
                  {jobDetails.workplaces[0].attributes.areaName}
                </p>
              </>
            }
            {
              jobDetails.attributes.createdAt &&
              <>
                <div className='w-2 h-2 mr-1 font--white'> <FontAwesomeIcon icon={faCalendarAlt} /> </div>
                <p className="flex flex-align-center font-hint font--white whitespace-nowrap">
                  {DateToTimeLeftReduced(jobDetails.attributes.createdAt)}
                </p>
              </>

            }

          </div>
          <div className="mt-4">
            <ApplyButton />
          </div >
        </div >
        <div className="absolute bottom-0 left-0 right-0 flex flex-justify-center py-2">
          <div className='flex items-center cursor-pointer whitespace-nowrap' onClick={scrollToDescription}>
            <p className='cursor-pointer font--white font-black button-hover--underline button-hover--underline-white'>{t('job.go-down')}</p>
            <FontAwesomeIcon className="font--white ml-1" icon={faArrowDown} />
          </div>
        </div >
      </div >
    </section >
  )
}

const scrollToDescription = (): void => window.scrollTo({ top: document.getElementById('cover').scrollHeight, behavior: 'smooth' });


export const notify = (text: string) => toast.warn(text);

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
                <SectionJobDetails title={t('job.type.title')} value={t('job.type', { count: job.attributes.employmentType })} icon={faHandshake} />
              }
              {
                job.attributes.maxSalary &&
                <SectionJobDetails title={t('job.salary.title')} value={`${job.attributes.minSalary} - ${job.attributes.maxSalary} ${t('job.salary', { count: job.attributes.salaryCurrencyId })}`} icon={faCoin} />
              }
              {
                job.attributes.salaryFrequency &&
                <SectionJobDetails title={t('job.frequency.title')} value={t('job.frequency', { count: job.attributes.salaryFrequency })} icon={faClock} />
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

const ApplyButton = () => {
  const { t } = useTranslation("common");

  return (
    <ButtonBasic classes='button-title box-shadow-container--elevated'
      onClick={() => notify(t('toast.apply.warning'))}>
      {t('job.apply.button')}
      <div className='w-3 h-3 flex items-center justify-center ml-1'>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare}></FontAwesomeIcon>
      </div>
    </ButtonBasic>
  )
}

const Job: NextPage<JobProps> = () => {
  const { t } = useTranslation("common");
  const [data, setData] = useState<JobProps>({ companyInfo: null, jobDetails: null });
  const [isLoading, setLoading] = useState(true);
  const jobId: any = useRouter().query?.id as any


  useEffect(() => {
    if (!jobId) { return; }
    async function getJobsData() {
      const companyInfo = await getCompanyInfo();
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
              <Navbar logoUrl={data.companyInfo.attributes.logo} transparent={true} url='jobs' companyUrl={data.companyInfo.attributes.site} />
              <JobBanner jobDetails={data.jobDetails} companyName={data.companyInfo.attributes.name} onClick={() => notify(t('toast.apply.warning'))} referralCode={jobId} />
              <JobDetails job={data.jobDetails} />
              <AboutCompany {...data.companyInfo} />
              <Footer />
              <FloatingContainer>
                <ApplyButton />
              </FloatingContainer>
              <ToastContainer className="font-public font-title w-72" position='bottom-center' style={{ width: "700px" }} />
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
      {
        (isLoading) &&
        <h2>isLoading</h2>
      }
    </>

  )
};

export default Job