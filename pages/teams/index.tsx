import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
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
          <div className={`${reduced ? 'desktop:w-3/5' : ''}`}>
            <div className='mobile:flex-col flex flex-wrap flex-justify-center'>
              {departments?.map((department, i) => (
                <DepartmentCard key={i} department={department} reduced={reduced} />
              ))
              }
            </div>
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
  reduced: boolean;
}

const DepartmentCard = ({ department, reduced = false }: DepartmentCardProps) => {
  const picUrl = department.attributes.picture ? bucketXL + department.attributes.picture : false;
  return (
    <Link href={{ pathname: `/teams/${department.id}` }}>
      <a className={`mobile:w-full p-1 ${reduced ? 'desktop:w-full' : 'desktop:w-1/3'}`}>
        <div className="flex h-30 box-shadow-container--card background-center br-1 overflow-hidden cursor-pointer" style={picUrl ? { backgroundImage: `url(${picUrl})` } : {}}>
          <div className="flex flex-col justify-center items-center text-center full-width full-height background-color--blurr-dark">
            <p className="font-big-title desktop:text-4xl mobile:text-3xl font--white">{department.attributes.name}</p>
            <p className="font-hint font--white">{department.attributes.availableJobs} {Translate(department.attributes.availableJobs !== 1 ? 'offers' : 'offer')}</p>
          </div>
        </div>
      </a>
    </Link>
  )
}

const Teams: NextPage<{ pageProps: { companyInfo: Company } }> = ({ pageProps }: { pageProps: { companyInfo: Company } }) => {
  useEffect(() => {
    ApplyDynamicStyles(pageProps.companyInfo.attributes.primaryColor, pageProps.companyInfo.careers?.style);
  }, [])
  return (
    <>
      <Header company={pageProps.companyInfo} title={Translate('teams')} />
      <div className="pt-8">
        <Navbar company={pageProps.companyInfo} url='teams' />
        <Areas {...pageProps.companyInfo} />
        <AboutCompany {...pageProps.companyInfo} />
        <Footer />
      </div>
    </>
  )
};

export const getServerSideProps = async ({ req }: any) => {
  const wildcard = getWildcardCode(req.headers.host);
  const companyInfo = await getCompanyInfo(wildcard);
  const translations = await serverSideTranslations(companyInfo.careers.languageCode, ["common"]);
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