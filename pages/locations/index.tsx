import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { Divider, Navbar } from "../../components";
import AboutCompany from "../../components/about";

import { ButtonBasic } from "../../components/buttons/button-basic";
import Footer from "../../components/footer";
import { Header } from "../../components/header";

import { getCompanyInfo } from "../../services";
import Company from "../../services/models/company";

const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("common");
  return array ? t(text, { returnObjects: true }) : t(text);
}

interface WorkplacesProps {
  companyInfo: Company;
  classes?: string;
}

export const Workplaces = (props: WorkplacesProps) => (
  <section id="workplaces" className={`py-10 ${props.classes}`}>
    <div className="flex-col flex-align-center mobile-container px-2">
      <p className="font-big-title text-center desktop:text-4xl mobile:text-3xl">{Translate('workplaces.title')}</p>
      <div className="flex-col full-width mt-5">
        {
          props.companyInfo.workplaces.map((workplace, i) => (
            <div key={i}>
              <div className="flex-align-center pt-3 mobile:flex-col mobile:text-center mobile:pb-1 desktop:flex desktop:pb-3">
                <div className="flex-col full-width">
                  <p className="font-big-title desktop:text-4xl mobile:text-3xl font-bold">{workplace.attributes.name}</p>
                  <p className="font-prose mt-1">{workplace.attributes.route} {workplace.attributes.streetNumber}</p>
                  <p className="font-hint">{workplace.attributes.postalCode}, {workplace.attributes.locality}</p>
                </div>
                <div className="flex justify-center py-2">
                  <Link href={{ pathname: '/jobs', query: { workplace: workplace.id } }}>
                    <a>
                      <ButtonBasic>{Translate('workplaces.jobs.button')}</ButtonBasic>
                    </a>
                  </Link>
                </div>
              </div>
              {i + 1 !== props.companyInfo.workplaces.length && <div><Divider /></div>}
            </div>
          ))
        }

      </div>
    </div>
  </section>
)

const Locations: NextPage = ({ pageProps }: any) => (
  <>
    <Header company={pageProps.companyInfo} title={Translate('locations')} />
    <div className="pt-8">
      <Navbar logoUrl={pageProps.companyInfo.attributes.logo} url='locations' companyUrl={pageProps.companyInfo.attributes.site} color={pageProps.companyInfo.attributes.primaryColor} />
      <Workplaces companyInfo={pageProps.companyInfo} classes="background-color--white" />
      <AboutCompany {...pageProps.companyInfo} />
      <Footer />
    </div>
  </>
);


export const getStaticProps = async ({ locale }: { locale: string }) => {
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

export default Locations;