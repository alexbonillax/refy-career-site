import Department from "../../../services/models/department";
import { faScreenUsers } from "@fortawesome/pro-light-svg-icons";
import { CardImage } from "./components/image-card";
import { JobsAvailable } from "./components/job-availability";
import Link from "next/link";
import { ButtonBasic } from "../../buttons/button-basic";
import { useTranslation } from "next-i18next";

interface DepartmentCardProps {
  department: Department;
}

export const DepartmentCard = ({ department }: DepartmentCardProps) => {
  const { t } = useTranslation("common");
  return (
    <div className={`flex flex-col text-center box-shadow-container--card br-var overflow-hidden`}>
      <div className="h-30 w-full desktop:min-h-full mobile:h-60 mobile:w-full relative">
        <CardImage pictures={department.attributes.pictures} icon={faScreenUsers} blurr={true} />
        <div className="absolute left-0 right-0 top-0 bottom-0 px-3 flex flex-col justify-center">
          <Link href={{ pathname: `/teams/${department.id}` }}>
            <p className="font-title font--light font--ellipsis-2 block">{department.attributes.name}</p>
          </Link>
          <JobsAvailable url={{ pathname: '/teams/' + department.id }} availability={department.stats.jobsCount} light={true} />
          <div className="flex flex-justify-center mt-2">
            <Link href={{ pathname: `/teams/${department.id}` }}>
              <ButtonBasic>{t('view-more')}</ButtonBasic>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}