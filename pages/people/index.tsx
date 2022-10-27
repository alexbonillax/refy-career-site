import type {NextPage} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {Header} from "../../components/header";
import {Divider, Navbar} from "../../components";
import AboutCompany from "../../components/about";
import Footer from "../../components/footer";
import {getCompanyInfo} from "../../services";
import {RefierCard} from "../jobs/referral/[id]";
import Department from "../../services/models/department";
import Profile from "../../services/models/profile";
import getWildcardCode from "../../utils/wildcard";
import Company from "../../services/models/company";
import {useEffect} from "react";
import {ApplyDynamicStyles} from "../../utils/dynamic-styles/apply-styles";
import {SSRCheck} from "../../utils/redirects";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import Link from "next/link";
import createCache from "@emotion/cache/dist/emotion-cache.cjs";


export const Translate = (text: string, array?: boolean): string => {
  const {t} = useTranslation("common");
  return array ? t(text, {returnObjects: true}) : t(text);
}

export const Coworkers = ({referrer, employees}: { referrer?: string, employees: Profile[] }) => {
  const {t} = useTranslation("common");
  return (
    employees &&
    <section className="py-8 background-theme">
        <div className="mobile-container px-3">
            <h1 className="font-big-title text-center desktop:text-4xl mobile:text-3xl mb-5">{t('coworkers')}</h1>{
          referrer &&
            <h2 className="font-subtitle text-center mt-1">{t('coworkers.description', {referrer})}</h2>
        }
            <div className="flex flex-wrap justify-center items-center">
              {
                employees.map((employee, i) => (
                  <div className="px-3" key={i}>
                    <RefierCard user={employee}/>
                  </div>
                ))
              }
            </div>
        </div>
    </section>
  )
}

export const DepartmentsMenuItem = ({department}: { department: Department }) => {
  const scrollToDepartment = (): void => document.getElementById('department-employees-' + department.id).scrollIntoView({behavior: "smooth", block: "center"});
  return (
    <div className="flex flex-align-center h-6">
      <div className='noselect relative flex flex-align-center button button--underline cursor-pointer' onClick={scrollToDepartment}>
        <p className='color-theme'>{department.attributes.name}</p>
      </div>
    </div>
  )
}

export const PeopleSection = ({departments}: { departments: Department[] }) => {
  if (departments.some(department => department.employees.length > 0)) {
    return (
      <div className="background-theme">
        <div className="mobile-container--responsive flex flex-align-start">
          <div className="sticky top-2 flex-column py-10 w-1/3 mobile:hidden px-3">
            {
              departments.map((department, i) => (
                department.employees.length > 0 &&
                <DepartmentsMenuItem key={i} department={department}></DepartmentsMenuItem>
              ))
            }
          </div>
          <div className="flex-column py-5 w-2/3 mobile:w-full">
            {
              departments.map((department, i) => (
                department.employees.length > 0 &&
                <section key={i} id={'department-employees-' + department.id} className="py-5 px-2">
                    <h1 className="font-big-title mobile:text-center desktop:text-4xl mobile:text-3xl mb-5">{department.attributes.name}</h1>
                    <div className="flex flex-wrap mobile:justify-center">
                      {
                        department.employees.map((employee, i) => (
                          <div className="desktop:w-1/3 mobile:w-1/2" key={i}>
                            <RefierCard user={employee}/>
                          </div>
                        ))
                      }
                    </div>
                </section>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

const People: NextPage<{ pageProps: { companyInfo: Company } }> = ({pageProps}: { pageProps: { companyInfo: Company } }) => {
  useEffect(() => {
    ApplyDynamicStyles(pageProps.companyInfo);
  }, [])
  return (
    <>
      <Header company={pageProps.companyInfo} title={Translate('people')}/>
      <Navbar url='people' company={pageProps.companyInfo}/>
      <PeopleSection departments={pageProps.companyInfo.departments}/> <AboutCompany {...pageProps.companyInfo} />
      <Footer/>
    </>
  )
};


export const getServerSideProps = async ({req}: any) => {
  const wildcard = getWildcardCode(req.headers.host);
  const companyInfo = await getCompanyInfo(wildcard);
  const translations = await serverSideTranslations(companyInfo.careers?.languageCode ?? 'en', ["common"]);

  let result = SSRCheck(companyInfo, translations);
  if (!companyInfo.careers?.referrers?.visible) {
    result = {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return result


};

export default People;
