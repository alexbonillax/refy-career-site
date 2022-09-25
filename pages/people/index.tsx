import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Header } from "../../components/header";
import { Navbar } from "../../components";
import AboutCompany from "../../components/about";
import Footer from "../../components/footer";
import { getCompanyInfo } from "../../services";
import { RefierCard } from "../jobs/referral/[id]";
import Department from "../../services/models/department";
import { DEFAULT_WILDCARD } from "../../constants";
import Profile from "../../services/models/profile";
import getWildcardCode from "../../utils/wildcard";


export const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("common");
  return array ? t(text, { returnObjects: true }) : t(text);
}

export const Coworkers = ({ referrer, employees, color }: { referrer: string, employees: Profile[], color: string }) => {
  const { t } = useTranslation("common");
  return (
    employees &&
    <section className="py-8 background-color--white">
      <div className="mobile-container px-3">
        <h1 className="font-big-title text-center desktop:text-4xl mobile:text-3xl mb-5">{t('coworkers')}</h1>
        <h2 className="font-subtitle text-center mt-1">{t('coworkers.description', {referrer})}</h2>
        <div className="flex flex-wrap justify-center items-center">
          {
            employees.map((employee, i) => (
              <div className="px-3" key={i}>
                <RefierCard user={employee} color={color} />
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export const PeopleSection = ({ departments, color }: { departments: Department[], color: string }) => {
  return (
    <div className="pt-8 background-color--white">
      {
        departments.map((department, i) => (
          department.employees.length > 0 &&
          <section key={i} id={department.attributes.name} className="py-10">
            <div className="mobile-container px-3">
              <h1 className="font-big-title text-center desktop:text-4xl mobile:text-3xl mb-5">{department.attributes.name}</h1>
              <div className="flex flex-wrap justify-center items-center">
                {
                  department.employees.map((employee, i) => (
                    <div className="px-3" key={i}>
                      <RefierCard user={employee} color={color} />
                    </div>
                  ))
                }
              </div>
            </div>
          </section>
        ))
      }
    </div>
  )
}

const People: NextPage = ({ pageProps }: any) => {
  return (
    <>
      <Header company={pageProps.companyInfo} title={Translate('people')} />
      <Navbar url='people' company={pageProps.companyInfo} />
      <PeopleSection departments={pageProps.companyInfo.departments} color={pageProps.companyInfo.attributes.primaryColor} />
      <AboutCompany {...pageProps.companyInfo} />
      <Footer />
    </>
  )
};

export const getServerSideProps = async ({ locale, req }: any) => {
  const translations = await serverSideTranslations(locale, ["common"]);
  const wildcard = getWildcardCode(req.headers.host);
  const companyInfo = await getCompanyInfo(wildcard);
  return {
    props: {
      _nextI18Next: translations._nextI18Next,
      pageProps: {
        companyInfo,
      }
    }
  };
};

export default People;
