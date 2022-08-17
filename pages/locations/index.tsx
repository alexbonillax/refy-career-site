import { Button } from "@mui/material";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AboutCompany, Divider } from "../../components";
import { Header } from "../../components/header";
import Navbar from "../../components/navbar";
import { getCompanyInfo } from "../../services";
import Company from "../../services/models/company";

export const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("workplaces");
  return array ? t(text, { returnObjects: true }) : t(text);
}

export const Workplaces = (companyInfo: Company) => (
  <section id="workplaces" className="py-10 background-color--grey--0">
    <div className="flex-col flex-align-center mobile-container px-2">
      <p className="font-big-title text-center desktop:font-big-title--40">{Translate('candidate.workplaces')}</p>
      <div className="flex-col full-width mt-5">
        {
          companyInfo.workplaces.map((workplace, i) => (
            <div key={i}>
              <div className="flex-align-center pt-3 mobile:flex-col mobile:text-center mobile:pb-1 desktop:flex desktop:pb-3">
                <div className="flex-col full-width">
                  <p className="font-prose font-bold">{workplace.attributes.name}</p>
                  <p className="font-prose mt-1">{workplace.attributes.route} {workplace.attributes.streetNumber}</p>
                  <p className="font-hint">{workplace.attributes.postalCode}, {workplace.attributes.locality}</p>
                </div>
                <div className="flex py-2">
                  <Button>{Translate('candidate.jobs.view')}</Button>
                </div>
              </div>
              {i + 1 !== companyInfo.workplaces.length && <div><Divider title={""} /></div>}
            </div>
          ))
        }

      </div>
    </div>
  </section>
)

const Locations: NextPage = ({ pageProps }: any) => (
  <>
    <Header name={pageProps.companyInfo.attributes.name} />
    <div className="pt-9">
      <Navbar logoUrl={pageProps.companyInfo.attributes.logo} />
      <Workplaces {...pageProps.companyInfo} />
      <AboutCompany {...pageProps.companyInfo} />
    </div>
  </>
);


export const getStaticProps = async ({ locale }: { locale: string }) => {
  const translations = await serverSideTranslations(locale, ["common", "home"]);
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

export default Locations;