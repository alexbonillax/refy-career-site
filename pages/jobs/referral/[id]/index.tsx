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
import 'react-toastify/dist/ReactToastify.css';
import { FloatingContainer } from '../../../../components/floating-container';
import { useEffect, useRef, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Footer from '../../../../components/footer';
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { JobBanner, JobDetails } from '../../[id]';
import Job from '../../../../services/models/job';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Logo, LogoTypes } from '../../../../components/logo';
import { bucketL } from '../../../../services/urls';
import Profile from '../../../../services/models/profile';
import { LoadingPage } from '../../../../components/loading-page';
import { Coworkers } from '../../../people';
import { BottomSnackbar } from '../../../../components/snackbar';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getWildcardCode from '../../../../utils/wildcard';
import { ApplyDynamicStyles } from '../../../../utils/dynamic-styles/apply-styles';
import Company from '../../../../services/models/company';

const applyJob = (referralCode: string) => {
  const tenantCode = getTenantCode(window.location.hostname);
  window.open(`https://${tenantCode}.refyapp.com/careers/jobs/apply/${referralCode}`, '_blank');
}

const openLinkedin = (username: string): Window => window.open(`https://www.linkedin.com/in/${username}`, '_blank');
interface RefierCardProps {
  user: Profile,
  color: string,
}
export const RefierCard = ({ user, color }: RefierCardProps) => {
  const picUrl = user?.attributes.avatar ? bucketL + user.attributes.avatar : '';
  return (
    <div className="flex-column text-center py-2 px-1">
      <div className="flex flex-justify-center">
        <Logo type={LogoTypes.refierCard} imgSrc={picUrl} color={color}></Logo>
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
        <p className="h-3 font-multiline font--grey">{user.attributes.headline}</p>
      </div>
    </div>
  )
}

export const ReferrerSection = ({ jobDetails, company, color }: { jobDetails: Job, company: string, color: string }) => {
  const { t } = useTranslation("common");
  return (
    <section id="about-company" className="py-10 background-color--grey--0">
      <div className="mobile-container px-3">
        <h1 className="font-big-title text-center desktop:text-4xl mobile:text-3xl mb-5">{t('job.apply.refier.title', { company })}</h1>
        <RefierCard user={jobDetails.referrerUser} color={color} />
      </div>
    </section>
  )
}

interface ReferralProps {
  jobDetails: Job;
  canApply?: boolean;
}

const Referral: NextPage<{ pageProps: { companyInfo: Company } }> = ({ pageProps }: { pageProps: { companyInfo: Company } }) => {
  const { t } = useTranslation("common");
  const [data, setData] = useState<ReferralProps>({ jobDetails: null, canApply: false });
  const [isLoading, setLoading] = useState(true);
  const jobId = useRouter().query?.id as any
  const snackbarRef = useRef(null);

  useEffect(() => {
    if (!jobId) { return }
    async function getJobsData() {
      ApplyDynamicStyles(pageProps.companyInfo.attributes.primaryColor, pageProps.companyInfo.careers?.style);
      const jobDetails = await getReferredJobDetails(jobId, pageProps.companyInfo.id);
      if (!jobDetails) {
        Router.push(`/jobs?unknown`);
      } else {
        const canApply = !!jobDetails.referrerUser?.id;
        setData({ jobDetails, canApply });
        setLoading(false);
      };
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
              <Header company={pageProps.companyInfo} title={data.jobDetails.attributes.title} />
              <Navbar transparent={true} url='jobs' company={pageProps.companyInfo} />
              <JobBanner jobDetails={data.jobDetails} company={pageProps.companyInfo} onClick={() => data.canApply ? applyJob(jobId) : snackbarRef.current.handleClick(t('toast.apply.warning'))} referralCode={jobId} />
              <JobDetails job={data.jobDetails} />
              <ReferrerSection jobDetails={data.jobDetails} company={pageProps.companyInfo.attributes.name} color={pageProps.companyInfo.attributes.primaryColor} />
              {
                pageProps.companyInfo.careers?.referrers?.visible &&
                <Coworkers referrer={data.jobDetails.referrerUser.attributes.firstName} employees={data.jobDetails.department?.employees} color={pageProps.companyInfo.attributes.primaryColor} />
              } 
              <AboutCompany {...pageProps.companyInfo} />
              <Footer />
              <FloatingContainer>
                <ButtonBasic classes='button-title button--floating box-shadow-container--elevated'
                  onClick={() => data.canApply ? applyJob(jobId) : snackbarRef.current.handleClick(t('toast.apply.warning'))}>
                  {t('job.apply.button')}
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-1"></FontAwesomeIcon>
                </ButtonBasic>
              </FloatingContainer>
              <BottomSnackbar ref={snackbarRef} />
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
        <LoadingPage fill={pageProps.companyInfo.attributes?.primaryColor} />
      }
    </>

  )
};

export const getServerSideProps = async ({ req }: any) => {
  const wildcard = getWildcardCode(req.headers.host);
  const companyInfo = await getCompanyInfo(wildcard);
  const translations = await serverSideTranslations(companyInfo.careers.languageCode, ["common"]);
  return {
    props: {
      _nextI18Next: translations._nextI18Next,
      pageProps: {
        companyInfo,
      }
    }
  };
};

export default Referral