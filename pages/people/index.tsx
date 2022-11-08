import type {NextPage} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {Header} from "../../components/header";
import {Navbar} from "../../components";
import AboutCompany from "../../components/about";
import Footer from "../../components/footer";
import {getCompanyInfo} from "../../services";
import Department from "../../services/models/department";
import Profile from "../../services/models/profile";
import getWildcardCode from "../../utils/wildcard";
import Company from "../../services/models/company";
import {useEffect} from "react";
import {ApplyDynamicStyles} from "../../utils/dynamic-styles/apply-styles";
import {SSRCheck} from "../../utils/redirects";
import { RefierCard } from "../../components/lists/cards/refier-card";

export const Translate = (text: string, array?: boolean): string => {
  const {t} = useTranslation("common");
  return array ? t(text, {returnObjects: true}) : t(text);
}

export const Coworkers = ({referrer, employees}: { referrer?: string, employees: Profile[] }) => {
  const {t} = useTranslation("common");
  return (
    employees &&
    <section className="py-8 background-color--white">
        <div className="mobile-container px-3">
            <h1 className="font-big-title text-center mb-5">{t('coworkers')}</h1>{
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
        <p className='font--grey-1000'>{department.attributes.name}</p>
      </div>
    </div>
  )
}

export const ReferrersSection = ({company}: { company: Company }) => {
  if (company.careers?.referrers?.visible) {
    return (
      <div className="background-color--white">
        <div className="mobile-container--responsive flex flex-align-start">
          <div className="sticky top-2 flex-column py-10 w-1/3 mobile:hidden px-3">
            {
              company.careers?.departments?.ids?.map(id => company.departments?.find(department => department.id === id))
                .map((department, i) => (
                department.employees.length > 0 &&
                <DepartmentsMenuItem key={i} department={department}></DepartmentsMenuItem>
              ))
            }
          </div>
          <div className="flex-column py-5 w-2/3 mobile:w-full">
            {
              company.careers?.departments?.ids?.map(id => company.departments?.find(department => department.id === id))
                .map((department, i) => (
                department.employees.length > 0 &&
                <section key={i} id={'department-employees-' + department.id} className="py-5 px-2">
                    <h1 className="font-big-title mobile:text-center mb-5">{department.attributes.name}</h1>
                    <div className="flex flex-wrap mobile:justify-center">
                      {
                        department.employees.map((employee, i) => (
                          <div className="desktop:w-1/3 mobile:w-full" key={i}>
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

const Referrers: NextPage<{ pageProps: { companyInfo: Company } }> = ({pageProps}: { pageProps: { companyInfo: Company } }) => {
  useEffect(() => {
    ApplyDynamicStyles(pageProps.companyInfo);
  }, [])
  return (
    <>
      <Header company={pageProps.companyInfo} title={Translate('people')}/>
      <Navbar url='people' company={pageProps.companyInfo}/>
      <ReferrersSection company={pageProps.companyInfo}/>
      <AboutCompany {...pageProps.companyInfo} />
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

export default Referrers;
