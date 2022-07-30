import { faSeedling } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Company } from "../services/models";
import { Divider } from "./divider";

export const AboutCompany = (companyInfo: Company) => (
  <section id="about-company" className="py-10 background-color--grey--0">
  <div className="mobile-container px-3">
    <p className="font-big-title text-center desktop:font-big-title--40">{ 'candidate.about-company'}</p>
    <div className="font-subtitle text-center mt-2">{ companyInfo.attributes.tagline }</div>
    <div className="font-prose py-3 mobile:text-center">{ companyInfo.attributes.description }</div>
    <Divider title={''} />
    <div className="flex-column py-4">
      <div className="flex flex-align-center">
        <FontAwesomeIcon icon={faSeedling} className="mr-3 icon-font"></FontAwesomeIcon>
        <div className="flex flex-align-center flex-justify-between full-width">
          <p className="font-multiline font--dark">{ 'jobs.job-details.company-about.size' }</p>
          <div className="flex flex-align-center">
            <p className="font-multiline font--ellipsis ml-1">{ 'jobs.job-details.company-about.workers' }</p>
          </div>
        </div>
      </div>
    </div>
    <Divider title={''} />
  </div>
</section>
)