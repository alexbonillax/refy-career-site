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

export const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("common");
  return array ? t(text, { returnObjects: true }) : t(text);
}

export const PeopleSection = ({ departments }: { departments: Department[] }) => {
  const { t } = useTranslation("common");
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
                      <RefierCard {...employee} />
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
      <Navbar logoUrl={pageProps.companyInfo.attributes.logo} url='people' companyUrl={pageProps.companyInfo.attributes.site} color={pageProps.companyInfo.attributes.primaryColor} />
      <PeopleSection departments={pageProps.companyInfo.departments} />
      <AboutCompany {...pageProps.companyInfo} />
      <Footer />
    </>
  )
};

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const translations = await serverSideTranslations(locale, ["common"]);
  const companyInfo = await getCompanyInfo();
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
