import { faBuilding } from "@fortawesome/pro-light-svg-icons";
import { faMapLocationDot } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Workplace from "../../../services/models/workplace";
import { ButtonBasic } from "../../buttons/button-basic";
import { CardImage } from "./components/image-card";
import { JobsAvailable } from "./components/job-availability";

export const WorkplaceCard = ({ workplace }: { workplace: Workplace }) => {
  const { t } = useTranslation("common");
  return (
    <div className={`flex flex-col text-center box-shadow-container--card br-var overflow-hidden mobile:flex-col`}>
      <div className="h-30 w-full desktop:min-h-full mobile:h-60 mobile:w-full relative">
        <CardImage pictures={workplace.attributes.pictures} icon={faBuilding} />
      </div>
      <div className={`flex flex-col w-full p-3 mobile:w-full background-color--white`}>
        <p className="font-title font--ellipsis">{workplace.attributes.name}</p>
        {
          workplace.attributes.shortDescription &&
            <p className="font-subtitle font--ellipsis-3">{workplace.attributes.shortDescription}</p>
        }
        <JobsAvailable url={{ pathname: '/locations/' + workplace.id.toString() }} availability={workplace.attributes.availableJobs} />
        <a className="flex flex-align-justify-center font-hint font-hover--underline cursor-pointer mt-1"
          href={'https://www.google.com/maps/search/' + workplace.attributes.route + '+' + workplace.attributes.streetNumber + '+' + workplace.attributes.postalCode} target="_blank" rel="noreferrer">
          <div className="flex items-center w-2 h-2 mr-1">
            <FontAwesomeIcon icon={faMapLocationDot} className="icon-font icon-font--normal icon-font--field-button"></FontAwesomeIcon>
          </div>
          <p className="font--ellipsis">{workplace.attributes.route} {workplace.attributes.streetNumber}, {workplace.attributes.postalCode}, {workplace.attributes.locality}</p>
        </a>
        <div className="flex flex-justify-center mt-2">
          <Link href={{ pathname: `/locations/${workplace.id}` }}>
              <ButtonBasic>{t('view-more')}</ButtonBasic>
          </Link>
        </div>
      </div>
    </div>
  )
}