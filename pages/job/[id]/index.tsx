import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getCompanyInfo, getTenantCode } from '../../../services'
import { NextPage } from 'next';
import { Header } from '../../../components/header';

import { Divider, Navbar } from '../../../components';
import { getJobDetails, getReferredJobDetails } from '../../../services/getJobDetails';
import Job from '../../../services/models/job';
import { bucketXL } from '../../../services/urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCalendarAlt, faHandshake, faMapMarkerAlt, faScreenUsers } from '@fortawesome/pro-regular-svg-icons';
import { faArrowDown, faCoin, faStopwatch } from '@fortawesome/pro-light-svg-icons';
import { DateToTimeLeftReduced } from '../../../utils/dateToTimeLeftReduced';
import AboutCompany from '../../../components/about';
import { useTranslation } from 'next-i18next';
import Company from '../../../services/models/company';
import { ButtonBasic } from '../../../components/buttons/button-basic';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FloatingContainer } from '../../../components/floating-container';

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
        <div className="mobile-container flex-column flex-justify-center flex-align-center px-3 mobile:py-44 desktop:py-60 text-center">
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
            <ButtonBasic classes='button-title' onClick={() => canApply ? applyJob(referralCode) : notify(t('toast.apply.warning'))}>Inscríbete a esta posición</ButtonBasic>
          </div >
        </div >
        <div className="absolute bottom-0 left-0 right-0 flex flex-justify-center py-2">
          <div className='flex items-center cursor-pointer'>
            <p className='cursor-pointer font--white font-black button-hover--underline button-hover--underline-white'>Ir abajo</p>
            <FontAwesomeIcon className="font--white ml-1" icon={faArrowDown} />
          </div>
        </div >
      </div >
    </section >
  )
}

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
  jobId: string;
}

const Job: NextPage<JobProps> = ({ companyInfo, jobDetails, canApply, jobId }: JobProps) => {
  const { t } = useTranslation("common");

  return (
    <>
      {
        jobDetails.attributes &&
        <>
          <Header companyName={companyInfo.attributes.name} title={jobDetails.attributes.title} />
          <Navbar logoUrl={companyInfo.attributes.logo} transparent={true} url='jobs' />
          <Banner jobDetails={jobDetails} companyName={companyInfo.attributes.name} canApply={canApply} referralCode={jobId} />
          <Details job={jobDetails} />
          <AboutCompany {...companyInfo} />
          <FloatingContainer>
            <ButtonBasic classes='button-title' onClick={() => canApply ? applyJob(jobId) : notify(t('toast.apply.warning'))}>Inscríbete a esta posición</ButtonBasic>
          </FloatingContainer>
          <ToastContainer position='bottom-center' />
        </>
      }

      {
        !jobDetails.attributes &&
        <div className='flex items-center justify-center'>
          <h1>WRONG REFERRAL CODE</h1>
        </div>
      }

    </>
  )
};

export const getServerSideProps = async ({ locale, params }: { locale: string, params: any }) => {
  const jobId = params.id;
  const translations = await serverSideTranslations(locale, ["common"]);
  const companyInfo = await getCompanyInfo();
  const jobDetails = (/[a-zA-Z]/.test(jobId)) ? await getReferredJobDetails(jobId) : await getJobDetails(jobId);
  const canApply = !!jobDetails.referrerUser?.id;
  return {
    props: {
      _nextI18Next: translations._nextI18Next,
      companyInfo,
      jobDetails,
      canApply,
      jobId
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