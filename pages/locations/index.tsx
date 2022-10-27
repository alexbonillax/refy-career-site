import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { Navbar } from "../../components";
import AboutCompany from "../../components/about";
import Footer from "../../components/footer";
import { Header } from "../../components/header";
import { getCompanyInfo } from "../../services";
import Company from "../../services/models/company";
import { ApplyDynamicStyles } from "../../utils/dynamic-styles/apply-styles";
import getWildcardCode from "../../utils/wildcard";
import { SSRCheck } from "../../utils/redirects";;
import { WorkplaceCard } from "../../components";

const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("common");
  return array ? t(text, { returnObjects: true }) : t(text);
}

interface WorkplacesProps {
  companyInfo: Company;
  classes?: string;
}

export const Workplaces = (props: WorkplacesProps) => (
  <section id="workplaces" className={`${props.classes}`}>
    <div className="mobile-container--responsive m-auto flex-col px-1 py-10">
      <p className="font-big-title text-center desktop:text-4xl mobile:text-3xl">{Translate('workplaces.title')}</p>
      <div className="flex flex-wrap flex-justify-center mt-5">
        {
          props.companyInfo.workplaces.map((workplace, i) => (
            <div className="p-1 w-m--100 w-d--33" key={i}>
              <WorkplaceCard key={i} workplace={workplace} />
            </div>
          ))
        }
      </div>
    </div>
  </section>
)

const Locations: NextPage<{ pageProps: { companyInfo: Company } }> = ({ pageProps }: { pageProps: { companyInfo: Company } }) => {
  useEffect(() => {
    ApplyDynamicStyles(pageProps.companyInfo);
  }, [])
  return (
    <>
      <Header company={pageProps.companyInfo} title={Translate('locations')} />
      <Navbar url='locations' company={pageProps.companyInfo} />
      <Workplaces companyInfo={pageProps.companyInfo} classes="background-theme" />
      <AboutCompany {...pageProps.companyInfo} />
      <Footer />
    </>
  )
};

export const getServerSideProps = async ({ req }: any) => {
  const wildcard = getWildcardCode(req.headers.host);
  const companyInfo = await getCompanyInfo(wildcard);
  const translations = await serverSideTranslations(companyInfo.careers?.languageCode ?? 'en', ["common"]);
  let result = SSRCheck(companyInfo, translations);
  if (companyInfo.workplaces.length <= 0) {
    result = {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return result
};

export default Locations;