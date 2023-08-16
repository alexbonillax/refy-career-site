import {NextPage} from "next";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useEffect} from "react";
import {Navbar} from "../../components";
import AboutCompany from "../../components/about";
import Footer from "../../components/footer";
import {Header} from "../../components/header";
import {getCompanyInfo} from "../../services";
import Company, {SectionProps} from "../../services/models/company";
import {ApplyDynamicStyles} from "../../utils/dynamic-styles/apply-styles";
import getWildcardCode from "../../utils/wildcard";
import {SSRCheck} from "../../utils/redirects";

;
import {WorkplaceCard} from "../../components";
import Workplace from "../../services/models/workplace";

const Translate = (text: string, array?: boolean): string => {
  const {t} = useTranslation("common");
  return array ? t(text, {returnObjects: true}) : t(text);
}

interface WorkplacesProps {
  section: SectionProps;
  workplaces: Workplace[];
  classes?: string;
}

export const WorkplacesSection = ({section, workplaces, classes}: WorkplacesProps) => (
  <>
    {
      section?.visible &&
        <section id="workplaces" className={`${classes}`}>
            <div className="mobile-container--responsive m-auto flex-col px-2 py-10">
                <h2 className="font-big-title text-center">{section?.title || Translate('workplaces.title')}</h2>{
              section?.subtitle &&
                <h3 className="font-subtitle text-center mt-2">{section.subtitle}</h3>
            }
                <div className="flex flex-wrap flex-justify-center mt-5">
                  {
                    section?.ids?.map(id => workplaces?.find(workplace => workplace.id === id))
                      .map((workplace, i) => (
                        <div className="p-1 w-m--100 w-d--33" key={i}>
                          <WorkplaceCard key={i} workplace={workplace}/>
                        </div>
                      ))
                  }
                </div>
            </div>
        </section>
    }
  </>
)

const Workplaces: NextPage<{ pageProps: { companyInfo: Company } }> = ({pageProps}: { pageProps: { companyInfo: Company } }) => {
  useEffect(() => {
    ApplyDynamicStyles(pageProps.companyInfo);
  }, [])
  return (
    <>
      <Header company={pageProps.companyInfo} title={Translate('locations')}/>
      <Navbar url='locations' company={pageProps.companyInfo}/>
      <WorkplacesSection section={pageProps.companyInfo.careers?.workplaces} workplaces={pageProps.companyInfo.workplaces} classes="background-color--white"/>
      <AboutCompany {...pageProps.companyInfo} /> <Footer/>
    </>
  )
};

export const getServerSideProps = async ({req}: any) => {
  const wildcard = getWildcardCode(req.headers.host);
  const companyInfo = await getCompanyInfo(wildcard);
  const translations = await serverSideTranslations(companyInfo.careers?.languageCode ?? 'en', ["common"]);
  let result = SSRCheck(companyInfo, translations);
  // TODO
  // if (companyInfo.workplaces.length <= 0) {
  //   result = {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }
  return result
};

export default Workplaces;