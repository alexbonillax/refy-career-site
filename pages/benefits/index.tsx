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
import { Benefit, BenefitCategory } from "../../services/models/benefit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleCheck } from "@fortawesome/pro-solid-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";

export const BenefitsArea = ({ benefits }: { benefits: Benefit[] }) => {
  if (benefits.length > 0) {
    const { t } = useTranslation("common");
    let categories: BenefitCategory[] = [];
    benefits.forEach(benefit => {
      if (!categories.find(category => category.id === benefit.category.id)) {
        categories.push(benefit.category);
      }
    });
    library.add(far)
    return (
      <>
        <section className="background-theme">
          <div className="mobile-container m-auto flex-col px-1 py-10">
            <p className="font-big-title text-center desktop:text-4xl mobile:text-3xl">{t('benefits')}</p>
            <div className="flex-column box-shadow-container--card br-var py-1 mx-1 mt-5 background-theme">
              {
                categories.map((category, i) => (
                  <Accordion key={i} first={i === 0} title={category.attributes.name} iconName={category.attributes.icon}>
                    <BenefitCategoryItem benefitsCategory={benefits.filter(benefit => benefit.category.id === category.id)} />
                  </Accordion>
                ))
              }
            </div>
          </div>
        </section>
      </>
    )
  }
}

const BenefitCategoryItem = ({ benefitsCategory }: { benefitsCategory: Benefit[] }) => (
  <div className="flex mobile:flex-col w-full px-1">
    <div className="flex-column desktop:w-2/5 p-1">
      <p className="font-multiline py-1">{benefitsCategory[0].category.attributes.shortDescription}</p>
    </div>
    <div className="flex-column desktop:w-3/5 p-1">
      {
        benefitsCategory.map((benefit, i) => (
          <div key={i} className="flex flex-align-center py-1">
            <FontAwesomeIcon icon={faCircleCheck} className='icon-font icon-font--normal color-dynamic' />
            <p className="ml-2 font-multiline color-theme">{benefit.attributes.name}</p>
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
  }, [])

  return (
    <>
      <Header company={pageProps.companyInfo} title={t('benefits')} />
      <Navbar company={pageProps.companyInfo} url='benefits' />
      <BenefitsArea benefits={pageProps.companyInfo.benefits} />
      <AboutCompany {...pageProps.companyInfo} /> <Footer />
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
