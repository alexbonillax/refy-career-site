import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AboutCompany } from "../../components";
import { Header } from "../../components/header";
import Navbar from "../../components/navbar";
import { getCompanyInfo } from "../../services";
import Company from "../../services/models/company";
import Department from "../../services/models/department";
import { bucketXL } from "../../services/urls";

export const Translate = (text: string, array?: boolean): string => {
  const { t } = useTranslation("home");
  return array ? t(text, { returnObjects: true }) : t(text);
}

export const Areas = (companyInfo: Company) => (
  <section id="teams" className="py-10 bg-white">
    <div className="mobile-container--responsive m-auto px-2 flex mobile:flex-col">
      <div className="flex-col w-d--40 pb-2">
        <p className="font-big-title mobile:text-center font-big-title--40">{'Teams'} </p>
      </div>
      <div className="w-d--60 mobile:flex-col flex flex-wrap">
        {companyInfo.departments?.map((department, i) => (
          <DepartmentCard key={i} {...department} />
        ))
        }
        <div className="flex flex-align-justify-center w-m--100 mt-2">
          <button className="button-outline--primary">Mierda</button>
          {/* <app-button-basic
              (click)="goToDepartments()"
              [size]="ButtonSize.NORMAL"
              [classes]="'button--light background-color--primary button-hover--size'"
              [backgroundColor]="company.attributes.primaryColor"
            >
              {{ 'candidate.departments.view' | transloco }}
            </app-button-basic> */}
        </div>
      </div>
    </div>
  </section>
)

const DepartmentCard = (department: Department) => {
  const picUrl = department.attributes.picture ? bucketXL + department.attributes.picture : false;
  return (<div className="w-m--100 w-d--50 p-1">
    <div className="flex h-30 box-shadow-container--card background-center br-1 overflow-hidden cursor-pointer" style={{ backgroundImage: picUrl ? `url(${picUrl})` : '' }}>
      <div className="flex flex-col justify-center items-center text-center full-width full-height background-color--blurr-dark">
        <p className="font-big-title font--white">{department.attributes.name}</p>
        <p className="font-hint font--white">{department.attributes.availableJobs} {Translate('candidate.departments.jobs')}</p>
      </div>
    </div>
  </div>)
}

const Teams: NextPage = ({ pageProps }: any) => (
  <>
    <Header name={pageProps.companyInfo.attributes.name} />
    <div className="pt-9">
      <Navbar logoUrl={pageProps.companyInfo.attributes.logo} />
      <Areas {...pageProps.companyInfo} />
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

export default Teams;