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
import Department from "../../services/models/department";
import { bucketXL } from "../../services/urls";
import { ApplyDynamicStyles } from "../../utils/dynamic-styles/apply-styles";
import getWildcardCode from "../../utils/wildcard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/pro-light-svg-icons";
import { loaderBucketXL } from "../../utils/image-loader";


export const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("common");
  return array ? t(text, { returnObjects: true }) : t(text);
}

interface AreasProps {
  departments: Department[];
  reduced?: boolean;
  colorButton?: string;
}

export const Areas = ({ departments = [], reduced = false }: AreasProps) => (
  <>
    {departments.length > 0 &&
      <section id="teams" className="py-10 bg-white">
        <div className={`m-auto flex ${reduced ? 'mobile-container mobile:flex-col' : 'mobile-container--responsive flex-col'}`}>
          <h1 className={`font-big-title font-big-title--40 mb-5 ${reduced ? 'desktop:w-2/5 mobile:text-center' : 'text-center'} `}>{Translate('teams')} </h1>
          <div className={`flex flex-wrap desktop:flex-row ${reduced ? 'flex-col desktop:w-full justify-center' : ''}`}>
            {
              departments?.map((department, i) => (
                <div className={`p-1 w-m--100 ${reduced ? '' : 'w-d--33'}`}>
                  <DepartmentCard key={i} department={department} />
                </div>
              ))
            }
            {
              reduced &&
              <div className="flex justify-center mt-2">
                <Link href="/teams">
                  <a className="">
                    <ButtonBasic classes='!py-4 !text-lg'>{Translate('teams.departments.view')}</ButtonBasic>
                  </a>
                </Link>
              </div>
            }
          </div>
        </div>
      </section>
    }
  </>
)

interface DepartmentCardProps {
  department: Department;
}

const DepartmentCard = ({ department }: DepartmentCardProps) => {
  return (
    <div className={`flex flex-col text-center box-shadow-container--card br-var overflow-hidden mobile:flex-col`}>
      <div className="h-30 w-full desktop:min-h-full mobile:h-60 mobile:w-full relative">
        {
          department.attributes.pictures
            ? <Image loader={loaderBucketXL} src={department.attributes.pictures} alt='workplace' layout="fill" className="flex relative object-cover" />
            : <div className={`h-full w-full flex items-center justify-center relative background-dynamic`}>
              <div className="w-6 h-9 flex items-center justify-center"><FontAwesomeIcon icon={faPeopleGroup} className='text-6xl font--white' /></div>
            </div>
        }
      </div>
      <div className={`flex flex-col w-full p-3 mobile:w-full`}>
        <p className="font-title font--ellipsis">{department.attributes.name}</p>
        <p className="font-hint font--white">{department.attributes.availableJobs} {Translate(department.attributes.availableJobs !== 1 ? 'offers' : 'offer')}</p>
        <div className="flex flex-justify-center mt-2">
          <Link href={{ pathname: `/teams/${department.id}` }}>
            <a>
              <ButtonBasic>{Translate('workplaces.jobs.button')}</ButtonBasic>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

const Teams: NextPage<{ pageProps: { companyInfo: Company } }> = ({ pageProps }: { pageProps: { companyInfo: Company } }) => {
  useEffect(() => {
    ApplyDynamicStyles(pageProps.companyInfo.attributes.primaryColor, pageProps.companyInfo.careers?.style);
  }, [])
  return (
    <>
      <Header company={pageProps.companyInfo} title={Translate('teams')} />
      <Navbar company={pageProps.companyInfo} url='teams' />
      <Areas {...pageProps.companyInfo} />
      <AboutCompany {...pageProps.companyInfo} />
      <Footer />
    </>
  )
};

export const getServerSideProps = async ({ req }: any) => {
  const wildcard = getWildcardCode(req.headers.host);
  const companyInfo = await getCompanyInfo(wildcard);
  const translations = await serverSideTranslations(companyInfo.careers?.languageCode ?? 'en', ["common"]);
  if (companyInfo.departments.length > 0) {
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

export default Teams;