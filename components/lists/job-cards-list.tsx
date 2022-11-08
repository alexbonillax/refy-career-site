import { useTranslation } from "next-i18next";
import Link from "next/link";
import Company from "../../services/models/company";
import Job from "../../services/models/job";
import Page from "../../services/models/page";
import { ButtonBasic } from "../buttons";
import { JobCard } from "./cards";
import { JobCardLoading } from "./cards/loading-cards/job-loading-card";

export interface JobListProps {
  recentJobsList: Page<Job>;
  company: Company;
  workplace?: number;
  loading: boolean;
  reduced?: boolean;
  classes?: string;
}

export const JobCardsList = ({ recentJobsList, workplace, loading = true, reduced = false }: JobListProps) => {
  const { t } = useTranslation("common");
  let jobs = recentJobsList?.content;
  if (workplace) {
    jobs = recentJobsList?.content.filter(job => job.overview.workplaces.some(wp => wp.id === +workplace));
  }
  return (
    <>
      <div className="flex flex-wrap flex-align-justify-center mt-5">
        {
          !loading && jobs && jobs.map((job, i) => (
            <div className="p-1 w-m--100 w-d--33" key={i}>
              <JobCard {...job} />
            </div>
          ))
        }
        {
          //TODO
          (!jobs || jobs.length == 0) && !loading &&
          <h1 className="font-prose">{t('job.empty')}</h1>
        }
        {
          loading && Array.from(Array(6)).map((_, i) =>
            <div className="p-1 w-m--100 w-d--33" key={i}>
              <JobCardLoading />
            </div>
          )
        }
      </div>
      {
        reduced &&
        <div className="flex justify-center mt-2">
          <Link href="/jobs">
            <ButtonBasic classes='!py-4 !text-lg'>{t('jobs.view')}</ButtonBasic>
          </Link>
        </div>
      }
    </>
  )
};