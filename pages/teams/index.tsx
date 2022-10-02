import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { Navbar } from "../../components";
import AboutCompany from "../../components/about";
import Footer from "../../components/footer";
import { Header } from "../../components/header";
import { getCompanyInfo } from "../../services";
import Company from "../../services/models/company";
import Department from "../../services/models/department";
import { bucketXL } from "../../services/urls";
import getWildcardCode from "../../utils/wildcard";

export const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("common");
  return array ? t(text, { returnObjects: true }) : t(text);
}

export const Areas = (companyInfo: Company) => (
  <>
    {companyInfo.departments.length > 0 &&
      <section id="teams" className="py-10 bg-white">
        <div className="mobile-container--responsive m-auto px-2 flex flex-col">
          <h1 className="font-big-title text-center font-big-title--40 mb-5">{Translate('teams')} </h1>
          <div className="mobile:flex-col flex flex-wrap">
            {companyInfo.departments?.map((department, i) => (
              <DepartmentCard key={i} {...department} />
            ))
            }
          </div>
        </div>
      </section>
    }
  </>
)

const DepartmentCard = (department: Department) => {
  const picUrl = department.attributes.picture ? bucketXL + department.attributes.picture : false;
  return (
    <Link href={{ pathname: `/teams/${department.id}` }}>
      <a className="w-m--100 w-d--50 p-1">
        <div className="flex h-30 box-shadow-container--card background-center br-1 overflow-hidden cursor-pointer" style={picUrl ? { backgroundImage: `url(${picUrl})` } : {}}>
          <div className="flex flex-col justify-center items-center text-center full-width full-height background-color--blurr-dark">
            <p className="font-big-title desktop:text-4xl mobile:text-3xl font--white">{department.attributes.name}</p>
            <p className="font-hint font--white">{department.attributes.availableJobs} {Translate(department.attributes.availableJobs !== 1 ? 'offers' : 'offer')}</p>
          </div>
        </div>
      </a>
    </Link>
  )
}

const Teams: NextPage = ({ pageProps }: any) => (
  <>
    <Header company={pageProps.companyInfo} title={Translate('teams')} />
    <div className="pt-8">
      <Navbar company={pageProps.companyInfo} url='teams' />
      <Areas {...pageProps.companyInfo} />
      <AboutCompany {...pageProps.companyInfo} />
      <Footer />
    </div>
  </>
);

export const getServerSideProps = async ({ locale, req }: any) => {
  const translations = await serverSideTranslations(locale, ["common"]);
  const wildcard = getWildcardCode(req.headers.host);
  const companyInfo = await getCompanyInfo(wildcard);

  if (companyInfo.departments.length > 0) {
    return {
      props: {
        _nextI18Next: translations._nextI18Next,
        pageProps: {
          companyInfo,
        }
      }
    };
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
};

export default Teams;