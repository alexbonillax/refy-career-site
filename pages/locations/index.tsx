import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { Navbar } from "../../components";
import AboutCompany from "../../components/about";
import { ButtonBasic } from "../../components/buttons/button-basic";
import Footer from "../../components/footer";
import { Header } from "../../components/header";
import { getCompanyInfo } from "../../services";
import Company from "../../services/models/company";
import Workplace from "../../services/models/workplace";
import { ApplyDynamicStyles } from "../../utils/dynamic-styles/apply-styles";
import getWildcardCode from "../../utils/wildcard";
import { loaderBucketXL } from "../../utils/image-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/pro-light-svg-icons";

const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("common");
  return array ? t(text, { returnObjects: true }) : t(text);
}

interface WorkplacesProps {
  companyInfo: Company;
  classes?: string;
}

const WorkplaceCard = ({ workplace, odd }: { workplace: Workplace, odd: boolean }) => (
  <div className={`box-shadow-container--card br-1 overflow-hidden my-3 flex ${odd ? 'desktop:flex-row' : 'desktop:flex-row-reverse'} mobile:flex-col`}>
    <div className="desktop:min-h-full mobile:h-60 desktop:w-1/2 mobile:w-full relative">
      {
        workplace.attributes.pictures && workplace.attributes?.pictures?.some(pic => !!pic)
          ? <Image loader={loaderBucketXL} src={workplace.attributes.pictures[0]} alt='workplace' layout="fill" className="flex relative object-cover mobile:rounded-t-lg" />
          : <div className={`h-full w-full flex items-center justify-center relative background-dynamic mobile:rounded-t-lg ${odd ? 'desktop:rounded-l-lg' : 'desktop:rounded-r-lg'}`}>
            <div className="w-6 h-9 flex items-center justify-center"><FontAwesomeIcon icon={faBuilding} className='text-6xl font--white' /></div>
          </div>
      }
    </div>
    <div className={`flex flex-col desktop:w-1/2 mobile:w-full p-4 justify-evenly`}>
      <p className="font-big-title font--ellipsis desktop:text-3xl mobile:text-2xl font-bold">{workplace.attributes.name}</p>
      <p className="font-hint font--ellipsis mt-1 mb-2">{workplace.attributes.route} {workplace.attributes.streetNumber}, {workplace.attributes.postalCode}, {workplace.attributes.locality}</p>
      {
        workplace.attributes.shortDescription &&
         <p className="font-prose font--ellipsis-3 mb-2">{workplace.attributes.shortDescription}</p>
      }
      <Link href={{ pathname: '/jobs', query: { workplace: workplace.id } }}>
        <a>
          <ButtonBasic>{Translate('workplaces.jobs.button')}</ButtonBasic>
        </a>
      </Link>
    </div>
  </div>
)

export const Workplaces = (props: WorkplacesProps) => (
  <section id="workplaces" className={`py-10 ${props.classes}`}>
    <div className="flex-col flex-align-center mobile-container px-2">
      <p className="font-big-title text-center desktop:text-4xl mobile:text-3xl">{Translate('workplaces.title')}</p>
      <div className="mobile-container--responsive">
        <div className="flex-col py-5">
          {
            props.companyInfo.workplaces.map((workplace, i) => (
              <WorkplaceCard key={i} workplace={workplace} odd={(i % 2 == 0)} ></WorkplaceCard>
            ))
          }
        </div>
      </div>
    </div>
  </section>
)

const Locations: NextPage<{ pageProps: { companyInfo: Company } }> = ({ pageProps }: { pageProps: { companyInfo: Company } }) => {
  useEffect(() => {
    ApplyDynamicStyles(pageProps.companyInfo.attributes.primaryColor, pageProps.companyInfo.careers?.style);
  }, [])
  return (
    <>
      <Header company={pageProps.companyInfo} title={Translate('locations')} />
      <div className="pt-8">
        <Navbar url='locations' company={pageProps.companyInfo} />
        <Workplaces companyInfo={pageProps.companyInfo} classes="background-color--white" />
        <AboutCompany {...pageProps.companyInfo} />
        <Footer />
      </div>
    </>
  )
};

export const getServerSideProps = async ({ req }: any) => {
  const wildcard = getWildcardCode(req.headers.host);
  const companyInfo = await getCompanyInfo(wildcard);
  const translations = await serverSideTranslations(companyInfo.careers?.languageCode ?? 'en', ["common"]);

  if (companyInfo.workplaces.length > 0) {
    return {
      props: {
        _nextI18Next: translations._nextI18Next,
        pageProps: {
          companyInfo,
        }
      }
    };
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
};

export default Locations;