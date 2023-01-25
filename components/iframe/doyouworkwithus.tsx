import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Company from "../../services/models/company";
import Profile from "../../services/models/profile";
import { ButtonBasic } from "../buttons";
import { Logo, LogoTypes } from "../logo";
import { faCircleArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { bucketM } from "../../services/urls";
import { useTranslation } from "next-i18next";


export const DoYouWorkWithUsBanner = (companyInfo: Company) => {
    const { t } = useTranslation("common");
    const showWorkmates: boolean = (companyInfo.careers?.referrers?.visible && companyInfo.departments.some(dept => dept.employees.length > 0));
    const workmates: Profile[] = companyInfo.departments.map(dept => dept.employees).flat();
    return (
      <section className={`relative flex flex-col items-center w-full background-dynamic pt-3 px-5 br-var ${showWorkmates ? 'pb-6' : 'pb-3'}`}>
        <h1 className="font-big-title mb-2 !text-white">{t('about.do-you-work.title', { company: companyInfo.attributes.name })}</h1>
        <p className="font-title !text-white text-center mb-3">{t('about.do-you-work.subtitle')}</p>
        <Link href={`https://${companyInfo.attributes.code}.refyapp.com`} target="_blank">
          <ButtonBasic classes="button button--outline-white">{t('about.do-you-work.button')} <FontAwesomeIcon className="icon-font icon-font--normal icon-font--light ml-1" icon={faCircleArrowRight} /></ButtonBasic>
        </Link>
        {
          showWorkmates &&
          <div className="flex w-full justify-center space-x-10 absolute -bottom-8">
            {
              workmates.map((user, i) => (
                <Logo key={i} type={LogoTypes.workmates} imgSrc={user?.attributes.avatar ? bucketM + user.attributes.avatar : ''} />
              ))
            }
          </div>
        }
      </section>
    )
  }