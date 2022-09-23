import { faSeedling } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "next-i18next";
import Company from "../services/models/company";
import { Divider } from "./divider";
import i18next from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
const AboutCompany = (companyInfo: Company) => {
  i18next.use(intervalPlural);
  const { t } = useTranslation("common");

  return (
    <section id="about-company" className="py-10 background-color--grey--0">
      <div className="mobile-container px-3">
        <h1 className="font-big-title text-center desktop:text-4xl mobile:text-3xl">{t('about.company', { company: companyInfo.attributes.name })}</h1>
        <div className="font-subtitle text-center mt-2">{companyInfo.attributes.tagline}</div>
        <div className="font-prose py-3 mobile:text-center">{companyInfo.attributes.description}</div>
        {
          companyInfo.attributes.size &&
          <>
            <Divider />
            <div className="flex-column py-4">
              <div className="flex flex-align-center">
                <div className='w-2 h-2 flex items-center justify-center mr-3'>
                  <FontAwesomeIcon icon={faSeedling} className="icon-font"></FontAwesomeIcon>
                </div>
                <div className="flex flex-align-center flex-justify-between full-width">
                  <p className="font-multiline font--dark">{t('size')}</p>
                  <div className="flex flex-align-center">
                    <p className="font-multiline font--ellipsis ml-1">{t('about.workers_interval', { postProcess: 'interval', count: +companyInfo.attributes.size })}</p>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
          </>
        }
      </div>
    </section>
  )
}

export default AboutCompany;