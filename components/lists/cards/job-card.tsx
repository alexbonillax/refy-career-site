import { useTranslation } from "next-i18next";
import Job from "../../../services/models/job";
import { CardImage } from "./components/image-card";
import { faSuitcase } from "@fortawesome/pro-light-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faScreenUsers, faHouseLaptop } from "@fortawesome/pro-regular-svg-icons";
import { ButtonBasic } from "../../buttons";
import { useEffect, useState } from "react";
import i18next from 'i18next';
import intervalPlural from "i18next-intervalplural-postprocessor";

export const JobCard = (job: Job) => {
  const { t } = useTranslation("common");
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    i18next.use(intervalPlural).init(_ => setLoading(false));
  }, []);
  return (
    <div className={`flex flex-col text-center box-shadow-container--card br-var overflow-hidden mobile:flex-col`}>
      <div className="h-30 w-full desktop:min-h-full mobile:h-60 mobile:w-full relative">
        <CardImage pictures={[job.attributes.picture]} icon={faSuitcase} />
      </div>
      <div className={`flex flex-col p-3 mobile:w-full background-color--white`}>
        <p className="font-title font--ellipsis">{job.attributes.title}</p>
        <div className="flex items-center justify-between h-3 mt-1">

          {
            job.overview?.department &&
            <Link className={`flex justify-start ${(job.overview?.workplaces.length > 0) && (!isLoading && job.attributes?.workplaceType) ? 'w-4/12' : 'w-6/12' }`} 
              href={{ pathname: '/teams/' + job.overview?.department?.id }}>
              <div className="flex w-full items-center font-hint font-hover--underline cursor-pointer">
                <div className="flex items-center w-2 h-2 mr-1">
                  <FontAwesomeIcon icon={faScreenUsers} className="icon-font icon-font--normal icon-font--field-button"></FontAwesomeIcon>
                </div>
                <p className="font--ellipsis">{job.overview.department.name}</p>
              </div>
            </Link>
          }
          {
            job.overview?.workplaces.length > 0 &&
            <Link className={`flex justify-center ${job.overview?.department && (!isLoading && job.attributes?.workplaceType) ? 'w-4/12' : 'w-6/12' }`}
              href={{ pathname: '/locations/' + job.overview.workplaces[0]?.id }}>
              <div className="flex w-full items-center justify-center font-hint  font-hover--underline cursor-pointer">
                <div className="flex items-center w-2 h-2 mr-1">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="icon-font icon-font--normal icon-font--field-button"></FontAwesomeIcon>
                </div>
                <p className="font--ellipsis">{job.overview.workplaces[0].areaName || ''}</p>
              </div>
            </Link>
          }

          {
            (!isLoading && job.attributes?.workplaceType) &&
            <div className={`flex justify-end items-center font-hint font-hover--underline cursor-pointer ${job.overview?.department && (job.overview?.workplaces.length > 0) ? 'w-4/12' : 'w-6/12' }`}>
              <div className="flex items-center w-2 h-2 mr-1">
                <FontAwesomeIcon icon={faHouseLaptop} className="icon-font icon-font--normal icon-font--field-button"></FontAwesomeIcon>
              </div>
              <p className="font--ellipsis">{t('job.workplace-type_interval', { postProcess: 'interval', count: job.attributes?.workplaceType })}</p>
            </div>
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