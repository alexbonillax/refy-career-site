import { getCompanyInfo, getTenantCode } from '../../../services'
import { NextPage } from 'next';
import { Header } from '../../../components/header';

import { Divider, Navbar } from '../../../components';
import { getJobDetails, getReferredJobDetails } from '../../../services/getJobDetails';
import Job from '../../../services/models/job';
import { bucketXL } from '../../../services/urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCalendarAlt, faHandshake, faMapMarkerAlt, faScreenUsers, faArrowUpRightFromSquare } from '@fortawesome/pro-regular-svg-icons';
import { faArrowDown, faCoin } from '@fortawesome/pro-light-svg-icons';
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

interface BannerProps {
  jobDetails: Job,
  companyName: string;
  canApply: boolean;
  referralCode: string;
}

const Banner = ({ jobDetails, companyName, canApply, referralCode }: BannerProps) => {
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
                {DateToTimeLeftReduced(jobDetails.attributes.createdAt)}
              </p>
            }

          </div>
          <div className="mt-4">
            <ButtonBasic classes='button-title' onClick={() => canApply ? applyJob(referralCode) : notify(t('toast.apply.warning'))}>{t('job.apply.button')}</ButtonBasic>
          </div >
        </div >
        <div className="absolute bottom-0 left-0 right-0 flex flex-justify-center py-2">
          <div className='flex items-center cursor-pointer' onClick={scrollToDescription}>
            <p className='cursor-pointer font--white font-black button-hover--underline button-hover--underline-white'>{t('job.go-down')}</p>
            <FontAwesomeIcon className="font--white ml-1" icon={faArrowDown} />
          </div>
        </div >
      </div >
    </section >
  )
}

const scrollToDescription = (): void => window.scrollTo({ top: 650, behavior: 'smooth' });

const applyJob = (referralCode: string) => {
  const tenantCode = getTenantCode();
  window.location.assign(`https://${tenantCode}.refyapp.com/careers/jobs/apply/${referralCode}`);
}

const notify = (text: string) => toast.warn(text);

interface JobDetailsProps {
  job: Job;
}

const Details = ({ job }: JobDetailsProps) => {
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
                <div className="flex flex-align-center">
                  <FontAwesomeIcon icon={faHandshake} className="mr-1" />
                  <div className="flex flex-align-center flex-justify-between full-width">
                    <p className="font-multiline font--dark">{t('job.type')}</p>
                    <p
                      className="font-multiline">{t('job.type', { count: job.attributes.employmentType })}</p>
                  </div>
                </div>
              }
              {
                job.attributes.maxSalary &&
                <div className="flex flex-align-center">
                  <FontAwesomeIcon icon={faCoin} className="mr-1" />
                  <div className="flex flex-align-center flex-justify-between full-width">
                    <p className="font-multiline font--dark">{'jobs.job-details.salary-range'}</p>
                    <p className="font-multiline">{job.attributes.minSalary} - {job.attributes.maxSalary} {job.attributes.salaryCurrencyId}</p>
                  </div>
                </div>
              }
              {/* { LO HE VISTO ESCONDIDO EN LA CAREER ASÍ QUE LO COMENTO
                jobDetails.attributes.salaryFrequency &&
                <div className="flex flex-align-center">
                  <FontAwesomeIcon icon={faStopwatch} className="mr-1" />
                  <div className="flex flex-align-center flex-justify-between full-width">
                    <p className="font-multiline font--dark">{t('job.pay-frequency')}</p>
                    <p className="font-multiline">{jobDetails.attributes.salaryFrequency}</p>
                  </div>
                </div>
              } */}
            </div>
          </div>
        }

      </div>
    </section>
  )
}

interface JobProps {
  companyInfo: Company;
  jobDetails: Job;
  canApply: boolean;
}

const Job: NextPage<JobProps> = () => {
  const { t } = useTranslation("common");
  const [data, setData] = useState<JobProps>({ companyInfo: null, jobDetails: null, canApply: null });
  const [isLoading, setLoading] = useState(true);
  const jobId: any = useRouter().query?.id as any


  useEffect(() => {
    async function getJobsData() {
      const companyInfo = await getCompanyInfo();
      const jobDetails = (/[a-zA-Z]/.test(jobId)) ? await getReferredJobDetails(jobId) : await getJobDetails(jobId);
      const canApply = !!jobDetails.referrerUser?.id;
      setData({ companyInfo, jobDetails, canApply });
      setLoading(false);
    }
    getJobsData();
  }, [])

  return (
    <>
      {(!isLoading) &&
        <>
          {
            data.jobDetails.attributes &&
            <>
              <Header company={data.companyInfo} title={data.jobDetails.attributes.title} />
              <Navbar logoUrl={data.companyInfo.attributes.logo} transparent={true} url='jobs' companyUrl={data.companyInfo.attributes.site} />
              <Banner jobDetails={data.jobDetails} companyName={data.companyInfo.attributes.name} canApply={data.canApply} referralCode={jobId} />
              <Details job={data.jobDetails} />
              <AboutCompany {...data.companyInfo} />
              <Footer />
              <FloatingContainer>
                <ButtonBasic classes='button-title box-shadow-container--elevated'
                  onClick={() => data.canApply ? applyJob(jobId) : notify(t('toast.apply.warning'))}>
                  {t('job.apply.button')}
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-1"></FontAwesomeIcon>
                </ButtonBasic>
              </FloatingContainer>
              <ToastContainer position='bottom-center' />
            </>
          }

          {
            !data.jobDetails.attributes &&
            <div className='flex items-center justify-center shado'>
              <h1>WRONG REFERRAL CODE</h1>
            </div>
          }

        </>
      }
      {
        (isLoading) &&
        <h2>Loading</h2>
      }
    </>

  )
};

export default Job