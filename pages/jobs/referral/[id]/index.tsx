import { getCompanyInfo, getTenantCode } from '../../../../services'
import { NextPage } from 'next';
import { Header } from '../../../../components/header';

import { Navbar } from '../../../../components';
import { getReferredJobDetails } from '../../../../services/getJobDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faArrowUpRightFromSquare } from '@fortawesome/pro-regular-svg-icons';
import AboutCompany from '../../../../components/about';
import { useTranslation } from 'next-i18next';
import { ButtonBasic } from '../../../../components/buttons/button-basic';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FloatingContainer } from '../../../../components/floating-container';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Footer from '../../../../components/footer';
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { JobBanner, JobDetails, JobProps, notify } from '../../[id]';
import Company from '../../../../services/models/company';
import Job from '../../../../services/models/job';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Logo, LogoTypes } from '../../../../components/logo';
import { bucketL } from '../../../../services/urls';
import Profile from '../../../../services/models/profile';
import { LoadingPage } from '../../../../components/loading-page';

const applyJob = (referralCode: string) => {
  const tenantCode = getTenantCode(window.location.hostname);
  window.location.assign(`https://${tenantCode}.refyapp.com/careers/jobs/apply/${referralCode}`);
}

const openLinkedin = (username: string): Window => window.open(`https://www.linkedin.com/in/${username}`, '_blank');

export const RefierCard = (user: Profile) => {
  const picUrl = user.attributes.avatar ? bucketL + user.attributes.avatar : false;
  return (
    <div className="flex-column text-center py-2 px-1">
      <div className="flex flex-justify-center">
        {
          picUrl &&
          <Logo type={LogoTypes.refierCard} imgSrc={picUrl}></Logo>
        }
      </div>
      <div className="flex-column full-width px-2 mt-2">
        <p className="font-title flex flex-align-justify-center">{user.attributes.firstName} {user.attributes.lastName}
          {
            user.attributes.linkedinVanityName &&
            <FontAwesomeIcon
              className='flex h-2 w-2 ml-1 icon-font icon-font--field-button cursor-pointer'
              icon={faLinkedin as IconProp}
              onClick={_ => openLinkedin(user.attributes.linkedinVanityName)}></FontAwesomeIcon>
          }
        </p>
        <p className="font-multiline font--grey">{user.attributes.headline}</p>
      </div>
    </div>
  )
}

export const ReferrerSection = ({ jobDetails, company }: { jobDetails: Job, company: string }) => {
  const { t } = useTranslation("common");
  return (
    <section id="about-company" className="py-10 background-color--grey--0">
      <div className="mobile-container px-3">
        <h1 className="font-big-title text-center desktop:text-4xl mobile:text-3xl mb-5">{t('job.apply.refier.title', { company })}</h1>
        <RefierCard {...jobDetails.referrerUser} />
      </div>
    </section>
  )
}

interface ReferralProps extends JobProps {
  companyInfo: Company;
  jobDetails: Job;
  canApply?: boolean;
}

const Referral: NextPage<JobProps> = () => {
  const { t } = useTranslation("common");
  const [data, setData] = useState<ReferralProps>({ companyInfo: null, jobDetails: null, canApply: false });
  const [isLoading, setLoading] = useState(true);
  const jobId = useRouter().query?.id as any

  useEffect(() => {
    if (!jobId) { return }

    async function getJobsData() {
      const companyInfo = await getCompanyInfo(window.location.hostname);
      const jobDetails = await getReferredJobDetails(jobId);
      const canApply = !!jobDetails.referrerUser?.id;
      setData({ companyInfo, jobDetails, canApply });
      setLoading(false);
    }
    getJobsData();
  }, [jobId])

  return (
    <>
      {!isLoading &&
        <>
          {
            data.jobDetails.attributes &&
            <>
              <Header company={data.companyInfo} title={data.jobDetails.attributes.title} />
              <Navbar logoUrl={data.companyInfo.attributes.logo} transparent={true} url='jobs' companyUrl={data.companyInfo.attributes.site} color={data.companyInfo.attributes.primaryColor} />
              <JobBanner jobDetails={data.jobDetails} companyName={data.companyInfo.attributes.name} onClick={() => data.canApply ? applyJob(jobId) : notify(t('toast.apply.warning'))} referralCode={jobId} />
              <JobDetails job={data.jobDetails} />
              <ReferrerSection jobDetails={data.jobDetails} company={data.companyInfo.attributes.name} />
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
        isLoading &&
        <LoadingPage />
      }
    </>

  )
};

export default Referral