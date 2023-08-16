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
  const department = job.department;
  const workplaces = job.workplaces?.length > 0;
  const workplaceType = job.attributes?.workplaceType;

  useEffect(() => {
    i18next.use(intervalPlural).init(_ => setLoading(false));
  }, []);
  return (
    <div className={`flex flex-col text-center box-shadow-container--card br-var overflow-hidden mobile:flex-col`}>
      <Link href={{ pathname: '/jobs/' + job.id }}>
        <div className="h-30 w-full desktop:min-h-full mobile:h-60 mobile:w-full relative">
          <CardImage pictures={[job.attributes?.picture]} icon={faSuitcase} />
        </div>
      </Link>
      <div className={`flex flex-col p-3 mobile:w-full background-color--white`}>
        <Link href={{ pathname: '/jobs/' + job.id }}>
          <p className="font-title font--ellipsis">{job.attributes?.title}</p>
        </Link>
        <div className="flex items-center justify-between h-3 mt-1 w-full">

          {
            department &&
            <Link className={`flex ${workplaces ? 'w-1/3' : 'w-1/2'}`}
              href={{ pathname: '/teams/' + job.department?.id }}>
              <div className="flex w-full items-center font-hint font-hover--underline cursor-pointer">
                <div className="flex items-center w-2 h-2 mr-1">
                  <FontAwesomeIcon icon={faScreenUsers} className="icon-font icon-font--normal icon-font--field-button"></FontAwesomeIcon>
                </div>
                <p className="font--ellipsis">{job.department?.attributes?.name}</p>
              </div>
            </Link>
          }

          {
            workplaces &&
            <Link className={`flex ${department ? 'w-1/3' : 'w-1/2'}`}
              href={{ pathname: '/locations/' + job.workplaces[0]?.id }}>
              <div className={`flex w-full items-center font-hint font-hover--underline cursor-pointer  ${department ? 'justify-center' : ''}`}>
                <div className="flex items-center w-2 h-2 mr-1">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="icon-font icon-font--normal icon-font--field-button"></FontAwesomeIcon>
                </div>
                <p className="font--ellipsis">{job.workplaces[0]?.attributes?.name || ''}</p>
              </div>
            </Link>
          }

          {
            (!isLoading && workplaceType) &&
            <div className={`flex font-hint w-1/3 ${department || workplaces ? 'justify-end' : ''}`}>
              <div className="flex items-center w-3 h-3">
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