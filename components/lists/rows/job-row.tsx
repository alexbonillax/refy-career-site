import { faHouseLaptop, faMapMarkerAlt, faScreenUsers, faSuitcase, IconDefinition } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import intervalPlural from "i18next-intervalplural-postprocessor";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Job from "../../../services/models/job";
import { ButtonBasic } from "../../buttons";
import i18next from 'i18next';
import { responsive } from "../../../utils/responsive";

export const JobRow = (job: Job) => {
  const { t } = useTranslation("common");
  const [isLoading, setLoading] = useState(true);
  const { isDesktop } = responsive();
  useEffect(() => {
    i18next.use(intervalPlural).init(_ => setLoading(false));
  }, []);

  const desktopRow = (
    <div className="flex flex-row h-12 w-full br-var box-shadow-container--card background-color--white">
      <div className="flex items-center w-5/12 pl-5">
        <p className="font-title font--ellipsis">{job.attributes.title}</p>
      </div>

      <div className="flex items-center w-52 pl-3">
        {
          job?.department?.attributes?.name &&
          <Link className="flex items-center w-52 font-multiline font--ellipsis" href={{ pathname: '/teams/' + job.department?.id }}>
            <RowIcon {...faSuitcase} />
            <p>{job.department?.attributes?.name}</p>
          </Link>
        }
      </div>
      <div className="flex items-center w-40 pl-2">
        {
          job.workplaces[0]?.attributes?.name &&
          <Link className="flex items-center w-40 font-multiline font--ellipsis" href={{ pathname: '/locations/' + job.workplaces[0]?.id }}>
            <RowIcon {...faMapMarkerAlt} />
            <p>{job.workplaces[0]?.attributes?.name}</p>
          </Link>
        }
      </div>
      <div className="flex items-center w-36 pl-2">
        {
          (!isLoading && job.attributes?.workplaceType) &&
          <>
            <RowIcon {...faHouseLaptop} />
            <p className="font-multiline font--ellipsis">{t('job.workplace-type_interval', { postProcess: 'interval', count: job.attributes?.workplaceType })}</p>
          </>
        }
      </div>
      <div className="flex items-center justify-end w-2/12 pr-4 ">
        <Link href={{ pathname: '/jobs/' + job.id }}>
          <ButtonBasic>{t('job.apply.button.short')}</ButtonBasic>
        </Link>
      </div>
    </div>
  )
  const mobileRow = (
    <Link className="cursor-pointer flex flex-col w-full br-var px-3 py-1 box-shadow-container--card background-color--white" href={{ pathname: '/jobs/' + job.id }}>
      {
        job.workplaces[0]?.attributes?.name &&
        <div className="flex items-center h-4">
          <RowIcon {...faMapMarkerAlt} />
          <p className="font-subtitle font--ellipsis">{job.workplaces[0]?.attributes?.name}</p>
        </div>
      }
      <p className="font-title font--ellipsis">{job.attributes?.title}</p>
      <div className="flex" >
        {
          job.department?.attributes?.name &&
          <div className="flex items-center h-4 border-r pr-2 mr-2">
            <RowIcon {...faScreenUsers} />
            <p className="font-subtitle font--ellipsis">{job.department?.attributes?.name}</p>
          </div>
        }
        {
          (!isLoading && job.attributes?.workplaceType) &&
          <div className="flex items-center h-4">
            <RowIcon {...faHouseLaptop} />
            <p className="font-subtitle font--ellipsis">{t('job.workplace-type_interval', { postProcess: 'interval', count: job.attributes?.workplaceType })}</p>
          </div>
        }
      </div>
    </Link>
  )
  return (
    <>
      {
        isDesktop ? desktopRow : mobileRow
      }
    </>
  )

}

const RowIcon = (icon: IconDefinition) => (
  <div className="flex items-center w-2 h-2 mr-1">
    <FontAwesomeIcon icon={icon} className={`icon-font icon-font--normal icon-font--field-button`}></FontAwesomeIcon>
  </div>
)