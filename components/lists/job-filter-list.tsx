import { faList, faWindowMaximize, IconDefinition } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { JobCardsList, JobListProps } from "./job-cards-list";
import { JobRowsList } from "./job-rows-list";

enum listType {
  cards = 'cards',
  rows = 'rows',
}

export const JobFilterList = ({ recentJobsList, company, workplace, loading = true, reduced = false, classes = '' }: JobListProps) => {
  const { t } = useTranslation("common");
  const [type, setType] = useState<listType>(listType.cards);
  useEffect(() => {
    if (localStorage.getItem('jobListType')) {
      setType(localStorage.getItem('jobListType') as unknown as listType);
    }
  }, [type])
  return (
    <section id="department-jobs" className={`background-color--white ${classes}`}>
      <div className="mobile-container--responsive m-auto flex-col px-2 py-10">
        <h2 className="font-big-title text-center">{company.careers.jobs?.title || t('jobs.available')}</h2>
        <p className="font-subtitle text-center my-2">{company.careers.jobs?.subtitle || t('jobs.find', { company: company.attributes.name })}</p>

        <div className="flex w-full justify-center">
          <FilterButton icon={faList} onClick={()=> { setType(listType.rows); localStorage.setItem('jobListType', listType.rows) } } />
          <FilterButton icon={faWindowMaximize} onClick={()=> { setType(listType.cards); localStorage.setItem('jobListType', listType.cards) } }/>
        <div>

          </div>
        </div>
        {
          type === listType.cards &&
          <JobCardsList recentJobsList={recentJobsList} company={company} workplace={workplace} loading={loading} reduced={reduced} classes={classes} />
        }
        {
          type === listType.rows &&
          <JobRowsList recentJobsList={recentJobsList} company={company} workplace={workplace} loading={loading} reduced={reduced} classes={classes} />
        }
      </div>
    </section>
  )
}

const FilterButton = ({icon, onClick} : {icon: IconDefinition, onClick: () => void }) => (
  <div onClick={onClick} className="flex justify-center items-center w-4 h-4 cursor-pointer br-var background-color--grey--0 box-shadow-container--card">
    <div className="flex items-center justify-center w-2 h-2">
      <FontAwesomeIcon icon={icon} className={`icon-font icon-font--normal icon-font--field-button`} />
    </div>
  </div>
)