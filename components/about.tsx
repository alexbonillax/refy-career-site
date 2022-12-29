import { faSeedling } from "@fortawesome/pro-light-svg-icons";
import { faCircleArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "next-i18next";
import Company from "../services/models/company";
import { Divider } from "./divider";
import i18next from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { useEffect, useState } from "react";
import { ButtonBasic } from "./buttons";
import Link from "next/link";
import { Logo, LogoTypes } from "./logo";
import Profile from "../services/models/profile";
import { bucketL, bucketM } from "../services/urls";

const AboutCompany = (companyInfo: Company) => {
  const { t } = useTranslation("common");
  const [isLoading, setLoading] = useState(true);

  const DoYouWorkWithUsBanner = () => {
    const showWorkmates: boolean = (companyInfo.careers?.referrers?.visible && companyInfo.departments.some(dept => dept.employees.length > 0));
    const workmates: Profile[] = companyInfo.departments.map(dept => dept.employees).flat();
    return (
      <section className={`relative flex flex-col items-center w-full background-dynamic pt-2 px-5 br-var ${showWorkmates ? 'pb-6' : 'pb-3'}`}>
        <h1 className="font-title !text-white">{t('about.do-you-work.title', { company: companyInfo.attributes.name })}</h1>
        <p className="font-hint !text-white text-center mb-2">{t('about.do-you-work.subtitle')}</p>
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

  useEffect(() => {
    i18next.use(intervalPlural).init(_ => setLoading(false));
  }, []);

  return (
    <section id="about-company" className="py-10 background-color--grey--0">
      <div className="mobile-container px-3">
        <h1 className="font-big-title text-center">{t('about.company', { company: companyInfo.attributes.name })}</h1>
        <div className="font-subtitle text-center mt-2">{companyInfo.attributes.tagline}</div>
        <div className="font-prose py-3 mobile:text-center">{companyInfo.attributes.description}</div>
        {
          (!isLoading && companyInfo.attributes.size) &&
          <>
            <div className="pb-4">
              <Divider />
              <div className="flex-column py-4">
                <div className="flex flex-align-center">
                  <div className='w-2 h-2 flex items-center justify-center mr-3'>
                    <FontAwesomeIcon icon={faSeedling} className="icon-font icon-font--normal icon-font--grey-1000"></FontAwesomeIcon>
                  </div>
                  <div className="flex flex-align-center flex-justify-between full-width">
                    <p className="font-multiline font--grey-1000">{t('size')}</p>
                    <div className="flex flex-align-center">
                      <p className="font-multiline font--ellipsis ml-1">{t('about.workers_interval', { postProcess: 'interval', count: +companyInfo.attributes.size })}</p>
                    </div>
                  </div>
                </div>
              </div>
              <Divider />
            </div>
          </>
        }
        {
          !companyInfo.attributes?.signupEnabled &&
          <DoYouWorkWithUsBanner />
        }
      </div>
    </section>
  )
}

export default AboutCompany;