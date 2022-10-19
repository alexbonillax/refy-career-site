import { faSuitcase } from "@fortawesome/pro-light-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTranslation } from "next-i18next";
import Link from "next/link"
import { Url } from "url";

export const JobsAvailable = ({ url, availability }: { url: Partial<Url>, availability: number }) => {
  const { t } = useTranslation("common");
  return (
    <div className="flex flex-wrap flex-justify-center h-3 mt-1">
      <Link href={url}>
        <a>
          <div className="flex flex-align-justify-center font-hint font-hover--underline cursor-pointer">
            <div className="flex items-center w-2 h-2 mr-1">
              <FontAwesomeIcon icon={faSuitcase} className="icon-font icon-font--normal icon-font--field-button"></FontAwesomeIcon>
            </div>
            <p className="font--ellipsis">{availability} {t(availability !== 1 ? 'offers' : 'offer')}</p>
          </div>
        </a>
      </Link>
    </div>
  )
}