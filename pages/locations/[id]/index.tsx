import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {Banner, BannerHeight, Divider, Navbar} from "../../../components";
import AboutCompany from "../../../components/about";
import { Header } from "../../../components/header";
import { getCompanyInfo, getRecentJobs } from "../../../services";
import Company from "../../../services/models/company";
import Page from "../../../services/models/page";
import Job from "../../../services/models/job";
import Footer from "../../../components/footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getWildcardCode from "../../../utils/wildcard";
import Router from 'next/router';
import { ApplyDynamicStyles } from "../../../utils/dynamic-styles/apply-styles";
import { SSRCheck } from "../../../utils/redirects";
import Workplace from "../../../services/models/workplace";
import { JobCardsList } from "../../../components/lists/job-cards-list";

export const Translate = (text: string, options?: any): string => {
  const { t } = useTranslation("common");
  return options ? t(text, options) : t(text);
}

interface WorkplaceDescriptionProps {
  workplace: Workplace;
}

const WorkplaceDescription = ({workplace} : WorkplaceDescriptionProps) => {
  return (
    (workplace.attributes.shortDescription || workplace.attributes.description) &&
    <section id="workplace-description" className="py-10 background-color--white">
      <div className="flex-column mobile-container px-3">
        <p className="font-subtitle my-1">{ workplace.attributes.shortDescription }</p>
        {
          workplace.attributes.description &&
          <div className="font-prose my-1" dangerouslySetInnerHTML={{ __html: workplace.attributes.description }}></div>
        }
      </div>
    </section>
  )
}

interface WorkplaceDetailsProps {
  jobList: Page<Job>;
}

const WorkplaceDetails: NextPage<{ pageProps: { companyInfo: Company } }> = ({ pageProps }: { pageProps: { companyInfo: Company } }) => {
  const workplaceId: any = +useRouter().query?.id;
  const [data, setData] = useState<WorkplaceDetailsProps>({ jobList: null })
  const [isLoading, setLoading] = useState(true)
  const workplace = pageProps.companyInfo.workplaces.find((workplace: Workplace) => workplace.id === workplaceId);
  useEffect(() => {
    if (!workplaceId || !workplace) { Router.push(`/locations`) };
    ApplyDynamicStyles(pageProps.companyInfo);
    async function getJobsData() {
      const jobList = await getRecentJobs(pageProps.companyInfo.id);
      setData({ jobList });
      setLoading(false);
    }
    getJobsData();
  }, [])
  return (
    <>
      {workplace &&
        <>
          <Header company={pageProps.companyInfo} title={Translate('locations')} />
          <Navbar company={pageProps.companyInfo} transparent={true} url='locations' />
          <Banner
              picture={workplace.attributes.pictures ? workplace.attributes.pictures[0] : null}
              tagline={pageProps.companyInfo.careers?.workplaces?.navbar || Translate('locations')}
              title={workplace.attributes.name}
              height={BannerHeight.smallScreen}
              backButton={{ url: '/locations', text: Translate('back-to', { page: pageProps.companyInfo.careers?.workplaces?.navbar || Translate('locations')}) }}
          />
          <WorkplaceDescription workplace={workplace}></WorkplaceDescription>
          <JobCardsList jobList={data.jobList} company={pageProps.companyInfo} workplace={workplaceId} loading={isLoading} classes="background-color--grey--0"/>
          <AboutCompany {...pageProps.companyInfo} />
          <Footer />
        </>
      }
    </>
  )
};


export const getServerSideProps = async ({ req }: any) => {
  const wildcard = getWildcardCode(req.headers.host);
  const companyInfo = await getCompanyInfo(wildcard);
  const translations = await serverSideTranslations(companyInfo.careers?.languageCode ?? 'en', ["common"]);

  let result = SSRCheck(companyInfo, translations);
  if (companyInfo?.departments?.length <= 0 || !companyInfo?.careers?.published) {
    result = {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return result
};

export default WorkplaceDetails;