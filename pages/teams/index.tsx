import {NextPage} from "next";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Link from "next/link";
import {useEffect} from "react";
import {Navbar} from "../../components";
import AboutCompany from "../../components/about";
import {ButtonBasic} from "../../components";
import Footer from "../../components/footer";
import {Header} from "../../components/header";
import {getCompanyInfo} from "../../services";
import Company from "../../services/models/company";
import Department from "../../services/models/department";
import {ApplyDynamicStyles} from "../../utils/dynamic-styles/apply-styles";
import getWildcardCode from "../../utils/wildcard";
import {SSRCheck} from "../../utils/redirects";
import {DepartmentCard} from "../../components";

export const Translate = (text: string, array?: boolean): string => {
  const {t} = useTranslation("common");
  return array ? t(text, {returnObjects: true}) : t(text);
}

interface AreasProps {
  companyInfo: Company;
  reduced?: boolean;
  classes?: string;
}

export const Areas = ({companyInfo = null, reduced = false, classes}: AreasProps) => (
  <>
    {companyInfo.departments.length > 0 &&
        <section id="teams" className={`${classes}`}>
            <div className="mobile-container--responsive m-auto flex-col px-1 py-10">
                <h2 className="font-big-title text-center desktop:text-4xl mobile:text-3xl">{companyInfo.careers.departments?.title || Translate('teams')}</h2>
                {
                companyInfo.careers.departments?.subtitle &&
                <h3 className="font-subtitle text-center mt-2">{companyInfo.careers.departments.subtitle}</h3>
                }
                <div className="flex flex-wrap flex-justify-center mt-5">
                  {
                    companyInfo.departments?.slice(0, reduced ? 3 : 1000).map((department, i) => (
                      <div key={i} className={`p-1 w-m--100 w-d--33`}>
                        <DepartmentCard department={department}/>
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

const Teams: NextPage<{ pageProps: { companyInfo: Company } }> = ({pageProps}: { pageProps: { companyInfo: Company } }) => {
  useEffect(() => {
    ApplyDynamicStyles(pageProps.companyInfo);
  }, [])
  return (
    <>
      <Header company={pageProps.companyInfo} title={Translate('teams')}/>
      <Navbar company={pageProps.companyInfo} url='teams'/>
      <Areas companyInfo={pageProps.companyInfo} classes="background-color--grey--0"/>
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