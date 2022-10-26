import Department from "../../services/models/department";
import { faScreenUsers } from "@fortawesome/pro-light-svg-icons";
import { CardImage } from "./components/image-card";
import { JobsAvailable } from "./components/job-availability";
import Link from "next/link";
import { ButtonBasic } from "../buttons/button-basic";
import { useTranslation } from "next-i18next";

interface DepartmentCardProps {
  department: Department;
}

export const DepartmentCard = ({ department }: DepartmentCardProps) => {
  const { t } = useTranslation("common");
  return (
    <div className={`flex flex-col text-center box-shadow-container--card br-var overflow-hidden mobile:flex-col`}>
      <div className="h-30 w-full desktop:min-h-full mobile:h-60 mobile:w-full relative">
        <CardImage pictures={department.attributes.pictures} icon={faScreenUsers} />
      </div>
      <div className={`flex flex-col w-full p-3 mobile:w-full background-theme`}>
        <p className="font-title font--ellipsis">{department.attributes.name}</p>
        <JobsAvailable url={{ pathname: '/teams/' + department.id }} availability={department.attributes.availableJobs} />
        <div className="flex flex-justify-center mt-2">
          <Link href={{ pathname: `/teams/${department.id}` }}>
            <ButtonBasic>{t('workplaces.jobs.button')}</ButtonBasic>
          </Link>
        </div>
      </div>
    </div>
  )
}