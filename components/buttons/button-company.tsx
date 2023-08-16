import { ButtonBasic } from ".";
import { faArrowUpRightFromSquare } from "@fortawesome/pro-solid-svg-icons";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CompanyWebsiteButton = ({site}: {site:string}) => {
    const { t } = useTranslation("common");

    return (
      <Link href={site} target="_blank">
          <ButtonBasic>
            {t('company-site')}
            <div className='w-2 h-2 flex items-center justify-center ml-1'>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="icon-font icon-font--normal" />
            </div>
          </ButtonBasic>
      </Link>
    )
  }