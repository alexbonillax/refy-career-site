import { useTranslation } from "next-i18next";
import Job from "../../services/models/job";
import { CardImage } from "./components/image-card";
import { faSuitcase } from "@fortawesome/pro-light-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faScreenUsers } from "@fortawesome/pro-regular-svg-icons";
import { ButtonBasic } from "../buttons/button-basic";

export const JobCard = (job: Job) => {
  const { t } = useTranslation("common");
  return (
    <div className={`flex flex-col text-center box-shadow-container--card br-var overflow-hidden mobile:flex-col`}>
      <div className="h-30 w-full desktop:min-h-full mobile:h-60 mobile:w-full relative">
        <CardImage pictures={[job.attributes.picture]} icon={faSuitcase} />
      </div>
      <div className={`flex flex-col w-full p-3 mobile:w-full background-theme`}>
        <p className="font-title font--ellipsis">{job.attributes.title}</p>
        <div className="flex flex-wrap flex-justify-center h-3 mt-1">
          {
            job.overview?.department &&
            <Link href={{ pathname: '/teams/' + job.overview.department.id }}>
              <div className="flex flex-align-justify-center font-hint mr-3 font-hover--underline cursor-pointer">
                <div className="flex items-center w-2 h-2 mr-1">
                  <FontAwesomeIcon icon={faScreenUsers} className="icon-font icon-font--normal icon-font--field-button"></FontAwesomeIcon>
                </div>
                <p>{job.overview.department.name}</p>
              </div>
            </Link>
          }
          {
            job.overview?.workplaces.length > 0 &&
            <Link href={{ pathname: '/locations/' + job.overview.workplaces[0].id }}>
              <div className="flex flex-align-justify-center font-hint font-hover--underline cursor-pointer">
                <div className="flex items-center w-2 h-2 mr-1">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="icon-font icon-font--normal icon-font--field-button"></FontAwesomeIcon>
                </div>
                <p>{job.overview.workplaces[0].areaName || ''}</p>
              </div>
            </Link>
          }
        </div>
        <div className="flex flex-justify-center mt-2">
          <Link href={{ pathname: '/jobs/' + job.id }}>
              <ButtonBasic>{t('job.apply.button.short')}</ButtonBasic>
          </Link>
        </div>
      </div>
    </div>

  )
}