import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import Image from "next/image";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScreenUsers } from "@fortawesome/pro-light-svg-icons";
import { loaderBucketXL } from "../../utils/image-loader";
import { SSRCheck } from "../../utils/redirects";
import {faSuitcase} from "@fortawesome/pro-regular-svg-icons";


export const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("common");
  return array ? t(text, { returnObjects: true }) : t(text);
}

interface AreasProps {
  departments: Department[];
  reduced?: boolean;
  colorButton?: string;
}

export const Areas = ({ departments = [], reduced = false}: AreasProps) => (
  <>
    {departments.length > 0 &&
      <section id="teams" className="bg-white">
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
                      <a className="">
                          <ButtonBasic classes='!py-4 !text-lg'>{Translate('teams.departments.view')}</ButtonBasic>
                      </a>
                  </Link>
              </div>
          }
        </div>
      </section>
    }
  </>
)

interface DepartmentCardProps {
  department: Department;
}

const DepartmentCard = ({ department }: DepartmentCardProps) => {
  return (
    <div className={`flex flex-col text-center box-shadow-container--card br-var overflow-hidden mobile:flex-col`}>
      <div className="h-30 w-full desktop:min-h-full mobile:h-60 mobile:w-full relative">
        {
          department.attributes.pictures && department.attributes?.pictures?.some(pic => !!pic)
            ? <Image loader={loaderBucketXL} src={department.attributes.pictures[0]} alt='workplace' layout="fill" className="flex relative object-cover" />
            : <div className={`h-full w-full flex items-center justify-center relative background-dynamic`}>
              <div className="w-6 h-9 flex items-center justify-center"><FontAwesomeIcon icon={faScreenUsers} className='icon-font text-6xl icon-font--light' /></div>
            </div>
        }
      </div>
      <div className={`flex flex-col w-full p-3 mobile:w-full`}>
        <p className="font-title font--ellipsis">{department.attributes.name}</p>
        <div className="flex flex-wrap flex-justify-center h-3 mt-1">
          <Link href={{ pathname: '/teams/' + department.id }}>
            <div className="flex flex-align-justify-center font-hint font-hover--underline cursor-pointer">
              <div className="flex items-center w-2 h-2 mr-1">
                <FontAwesomeIcon icon={faSuitcase} className="icon-font icon-font--normal icon-font--field-button"></FontAwesomeIcon>
              </div>
              <p className="font--ellipsis">{department.attributes.availableJobs} {Translate(department.attributes.availableJobs !== 1 ? 'offers' : 'offer')}</p>
            </div>
          </Link>
        </div>
        <div className="flex flex-justify-center mt-2">
          <Link href={{ pathname: `/teams/${department.id}` }}>
            <a>
              <ButtonBasic>{Translate('workplaces.jobs.button')}</ButtonBasic>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

const Teams: NextPage<{ pageProps: { companyInfo: Company } }> = ({ pageProps }: { pageProps: { companyInfo: Company } }) => {
  useEffect(() => {
    ApplyDynamicStyles(pageProps.companyInfo.attributes.primaryColor, pageProps.companyInfo.careers?.style);
  }, [])
  return (
    <>
      <Header company={pageProps.companyInfo} title={Translate('teams')} />
      <Navbar company={pageProps.companyInfo} url='teams' />
      <Areas {...pageProps.companyInfo} />
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