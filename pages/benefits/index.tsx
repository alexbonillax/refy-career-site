import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getCompanyInfo } from "../../services";
import { useTranslation } from "next-i18next";
import { Header } from "../../components/header";
import { Accordion, Navbar } from "../../components";
import AboutCompany from "../../components/about";
import Footer from "../../components/footer";
import { useEffect } from "react";
import getWildcardCode from "../../utils/wildcard";
import Company from "../../services/models/company";
import { ApplyDynamicStyles } from "../../utils/dynamic-styles/apply-styles";
import { SSRCheck } from "../../utils/redirects";
import Benefit from "../../services/models/benefit";
import { arrayDeleteDuplicatedElements } from "../../utils/array-delete-duplicated-elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from "@fortawesome/pro-regular-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";

const BenefitsArea = ({ benefits }: { benefits: Benefit[] }) => {
  let categories: string[] = benefits.map(benefit => benefit.category.attributes.name);
  const AllCategories = categories.filter(arrayDeleteDuplicatedElements);
  library.add(far)
  return (
    <>
      <section className="background-color--white mobile-container--responsive py-3">
        {
          AllCategories.map((category, i) => (
            <Accordion key={i} title={category}>
              <BenefitCategory benefitsCategory={benefits.filter(benefit => benefit.category.attributes.name === category)} />
            </Accordion>
          ))
        }
      </section>
    </>
  )
}

const BenefitCategory = ({ benefitsCategory }: { benefitsCategory: Benefit[] }) => (
  <div className="flex w-full mobile:flex-col desktop:h-60 mobile:h-auto">
    <div className="flex desktop:w-1/3 mobile:pb-5 mobile:items-center">
      <div className="w-6 h-6 rounded-3xl background-faded-dynamic flex items-center justify-center">
        <div className="w-3 h-3">
          <FontAwesomeIcon icon={['far', benefitsCategory[0].category.attributes.icon]} className='icon-font color-dynamic' />
        </div>
      </div>
      <h2 className="font-prose ml-2">{benefitsCategory[0].category.attributes.name}</h2>
    </div>
    <div className="flex desktop:w-2/3 mobile:w-full flex-wrap flex-col ">
      {
        benefitsCategory.map((benefit, i) => (
          <div key={i} className="flex pb-2">
            <div className="h-2 w-2 mt-0.5"><FontAwesomeIcon icon={faCheck} className='icon-font color-dynamic' /></div>
            <p className="pl-1">{benefit.attributes.name}</p>
          </div>
        ))
      }
    </div>

  </div>
)

const Benefits: NextPage<{ pageProps: { companyInfo: Company } }> = ({ pageProps }: { pageProps: { companyInfo: Company } }) => {
  const { t } = useTranslation("common");
  useEffect(() => {
    ApplyDynamicStyles(pageProps.companyInfo.attributes.primaryColor, pageProps.companyInfo.careers?.style);
    console.log(pageProps.companyInfo.benefits)
  }, [])

  return (
    <>
      <Header company={pageProps.companyInfo} title={t('benefits')} />
      <Navbar company={pageProps.companyInfo} url='benefits' />
      <BenefitsArea benefits={pageProps.companyInfo.benefits} />
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
  if (companyInfo.benefits.length <= 0) {
    result = {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return result
}

export default Benefits;
