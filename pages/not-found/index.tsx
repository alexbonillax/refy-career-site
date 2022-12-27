import { NextPage } from "next";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getCompanyInfo } from "../../services";
import Company from "../../services/models/company";
import { bucketM } from "../../services/urls";
import getWildcardCode from "../../utils/wildcard";
import { logo } from "../../assets/svg";
import { useTranslation } from "next-i18next";
import { CompanyWebsiteButton } from "../../components/buttons/button-company";

export const NotFound: NextPage<{ companyInfo: Company }> = ({ companyInfo }: { companyInfo: Company }) => {
  const { t } = useTranslation("common");

  const NonExistingCompany = () => (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="mobile-container pl-2">
      <Image src={logo} alt={'powered by Refy'} width={165} height={132} />
      <h1 className="font-title">{t('not-found.404')}</h1>

      </div>
    </div>
  );

  const NonCareersInfo = () => {
    const srcLogo = companyInfo.attributes?.logo ? bucketM + companyInfo.attributes?.logo : logo;

    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="flex mb-4 mx-2 mobile:flex-col mobile:items-center mobile:space-y-4 desktop:flex-row">
          <span className="w-10 h-10 flex flex-align-justify-center"><div className="w-10 h-10 border !border-slate-700 rounded-md background-center" style={{ backgroundImage: srcLogo ? `url(${srcLogo})` : '' }}></div></span>
          <div className="flex flex-col justify-between pt-0.5 ml-1 mobile:items-center">
            <h1 className="font-big-title">{companyInfo.attributes.name}</h1>
            <h1 className="font-title">{companyInfo.attributes.tagline}</h1>
          </div>
        </div>
        <p className="mx-2 mb-2">{t('not-found.description')}</p>
        <CompanyWebsiteButton site={companyInfo.attributes?.site} />
      </div>
    )
  };

  return (
    companyInfo.id ? <NonCareersInfo /> : <NonExistingCompany />
  )
};

export const getServerSideProps = async ({ req }: any) => {
  const wildcard = getWildcardCode(req.headers.host);
  const companyInfo = await getCompanyInfo(wildcard);
  const translations = await serverSideTranslations(companyInfo.careers?.languageCode ?? 'en', ["common"]);

  return {
    props: {
      _nextI18Next: translations._nextI18Next,
      companyInfo,
    }
  }
};

export default NotFound;