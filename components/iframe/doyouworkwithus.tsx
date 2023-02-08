import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Company from "../../services/models/company";
import Profile from "../../services/models/profile";
import { ButtonBasic } from "../buttons";
import { Logo, LogoTypes } from "../logo";
import { faCircleArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { bucketM } from "../../services/urls";
import { useTranslation } from "next-i18next";
import { useState } from "react";

export const DoYouWorkWithUsBanner = (companyInfo: Company) => {
  const { t } = useTranslation("common");
  const showWorkmates: boolean = (companyInfo.careers?.referrers?.visible && companyInfo.departments.some(dept => dept.employees.length > 0));
  const workmates: Profile[] = companyInfo.departments.map(dept => dept.employees).flat();
  const loginProviders = companyInfo.attributes.loginProviders.length > 0;
  const [email, setEmail] = useState('');
  const goToLogin = () => { if (email) window.open(`https://${companyInfo.attributes.code}.refyapp.com?email=${email}`) };
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      goToLogin();
    }
  }
  return (
    <section className={`relative flex flex-col items-center w-full background-dynamic pt-10 px-5 br-var ${showWorkmates ? 'pb-10' : 'pb-6'}`}>
      <h1 className="font-big-title mb-2 !text-white">{t('about.do-you-work.title', { company: companyInfo.attributes.name })}</h1>
      <p className="font-title !text-white text-center mb-3">{t('about.do-you-work.subtitle')}</p>
      {
        loginProviders ?
          <div className="flex h-6 w-100 pl-3 justify-between items-center background-color--white br-var">
            <input className="w-full h-6 font-hint background-color--white br-var" placeholder="Tu correo aquí" onChange={e => setEmail(e.target.value)} onKeyDown={handleKeyDown} />
            <div className={`h-4 w-8 flex justify-center items-center br-var ${email ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={goToLogin}>
              <FontAwesomeIcon className="icon-font icon-font--grey-300 ml-1" icon={faCircleArrowRight} />
            </div>
          </div> :
          <Link href={`https://${companyInfo.attributes.code}.refyapp.com?email=${email}`}>
            <ButtonBasic classes="button button--outline-white">{t('about.do-you-work.button')} <FontAwesomeIcon className="icon-font icon-font--normal icon-font--light ml-1" icon={faCircleArrowRight} /></ButtonBasic>
          </Link>
      }
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
