import { useTranslation } from "next-i18next";
import Link from "next/link";
import { ButtonBasic } from "../buttons";
import { JobListProps } from "./job-cards-list";
import { JobRow } from "./rows/job-row";
import { JobRowLoading } from "./rows/loading-rows/job-loading-row";

export const JobRowsList = ({ recentJobsList, company, workplace, loading = true, reduced = false, classes = '' }: JobListProps) => {
  const { t } = useTranslation("common");
  let jobs = recentJobsList?.content;
  if (workplace) {
    jobs = recentJobsList?.content.filter(job => job.overview.workplaces.some(wp => wp.id === +workplace));
  }
  return (
    <>
      <div className="flex flex-wrap flex-align-justify-center mt-5 space-y-5">
        {
          !loading && jobs && jobs.map((job, i) => (
            <JobRow {...job} key={i} />
          ))
        }
        {
          //TODO
          (!jobs || jobs.length == 0) && !loading &&
          <h1 className="font-prose">{t('job.empty')}</h1>
        }
        {
          loading && Array.from(Array(6)).map((_, i) =>
            <JobRowLoading key={i} />
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