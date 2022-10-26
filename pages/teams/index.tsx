import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useEffect } from "react";
import { Navbar } from "../../components";
import AboutCompany from "../../components/about";
import { ButtonBasic } from "../../components/buttons/button-basic";
import Footer from "../../components/footer";
import { Header } from "../../components/header";
import { getCompanyInfo } from "../../services";
import Company from "../../services/models/company";
import Department from "../../services/models/department";
import { ApplyDynamicStyles } from "../../utils/dynamic-styles/apply-styles";
import getWildcardCode from "../../utils/wildcard";
import { SSRCheck } from "../../utils/redirects";
import { DepartmentCard } from "../../components/cards/department-card";

export const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("common");
  return array ? t(text, { returnObjects: true }) : t(text);
}

interface AreasProps {
  departments: Department[];
  reduced?: boolean;
  classes?: string;
}

export const Areas = ({ departments = [], reduced = false, classes }: AreasProps) => (
  <>
    {departments.length > 0 &&
      <section id="teams" className={`${classes}`}>
        <div className="mobile-container--responsive m-auto flex-col px-1 py-10">
          <p className="font-big-title text-center desktop:text-4xl mobile:text-3xl">{Translate('teams')}</p>
          <div className="flex flex-wrap flex-justify-center mt-5">
            {
              departments?.map((department, i) => (
                <div key={i} className={`p-1 w-m--100 w-d--33`}>
                  <DepartmentCard department={department} />
                </div>
              ))
            }
          </div>
          {
            reduced &&
            <div className="flex justify-center mt-2">
              <Link href="/teams">
                  <ButtonBasic classes='!py-4 !text-lg'>{Translate('teams.departments.view')}</ButtonBasic>
              </Link>
            </div>
          }
        </div>
      </section>
    }
  </>
)

const Teams: NextPage<{ pageProps: { companyInfo: Company } }> = ({ pageProps }: { pageProps: { companyInfo: Company } }) => {
  useEffect(() => {
    ApplyDynamicStyles(pageProps.companyInfo.attributes.primaryColor, pageProps.companyInfo.careers?.style);
  }, [])
  return (
    <>
      <Header company={pageProps.companyInfo} title={Translate('teams')} />
      <Navbar company={pageProps.companyInfo} url='teams' />
      <Areas {...pageProps.companyInfo} classes="background--grey-0-theme"/>
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
  if (companyInfo?.departments?.length == 0) {
    result = {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return result
};

export default Teams;