import { faList, faWindowMaximize } from "@fortawesome/pro-light-svg-icons";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { getJobs, JobSearchProps } from "../../services";
import Company from "../../services/models/company";
import Job from "../../services/models/job";
import Page from "../../services/models/page";
import { ButtonTiny } from "../buttons/button-tiny";
import { SearchBar } from "../input/search-bar";
import { Select, SelectListProps, SelectProps } from "../select/select";
import { JobCardsList, JobListProps } from "./job-cards-list";
import { JobRowsList } from "./job-rows-list";
import _ from 'lodash';

enum ListType {
  cards = 'cards',
  rows = 'rows',
}

export const JobFilterList = ({ company, workplace, reduced = false, classes = '' }: JobListProps) => {
  const { t } = useTranslation("common");
  let lastSearch: JobSearchProps = { companyId: company.id ,page: 1, perPage: 20, searchText: '', workplaces: [], departments: [] };
  const [type, setType] = useState<ListType>(ListType.cards);
  const [jobList, setJobList] = useState<Page<Job>>();
  const [isLoading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState<JobSearchProps>(lastSearch)

  const searchJobs = async (): Promise<void> => {
    setLoading(true);
    const jobList = await getJobs(searchParams);
    setJobList(jobList);
    setLoading(false);
  }
  useEffect(() => {
    async function fetchJobsOnInit() {
      await searchJobs();
    }
    if (localStorage.getItem('jobListType')) {
      setType(localStorage.getItem('jobListType') as unknown as ListType);
    }
    fetchJobsOnInit();
  }, [])

  useEffect(() => {
    if (
      lastSearch.searchText === searchParams.searchText ||
      lastSearch.workplaces[0] === searchParams.workplaces[0] ||
      lastSearch.departments[0] === searchParams.departments[0]
    ) {
      lastSearch = searchParams;
      searchJobs();
    }
  }, [searchParams])
  return (
    <section id="department-jobs" className={`background-color--white ${classes}`}>
      <div className="mobile-container--responsive m-auto flex-col px-2 pt-10">
        <h2 className="font-big-title text-center">{company.careers.jobs?.title || t('jobs.available')}</h2>
        <p className="font-subtitle text-center my-2">{company.careers.jobs?.subtitle || t('jobs.find', { company: company.attributes.name })}</p>

        <FilterJobsArea searchParams={searchParams} type={type} companyInfo={company} setType={value => setType(value)} setSearch={value => { setSearchParams(value) }} />
        {
          type === ListType.cards &&
          <JobCardsList jobList={jobList} company={company} workplace={workplace} loading={isLoading} reduced={reduced} classes={classes} />
        }
        {
          type === ListType.rows &&
          <JobRowsList jobList={jobList} company={company} workplace={workplace} loading={isLoading} reduced={reduced} classes={classes} />
        }
      </div>
    </section>
  )
}

interface FilterJobsAreaProps {
  searchParams: JobSearchProps;
  companyInfo: Company;
  type: ListType;
  setType: (e: ListType) => void;
  setSearch: (e: JobSearchProps) => void;
}

const FilterJobsArea = ({ searchParams, companyInfo, type, setType, setSearch }: FilterJobsAreaProps) => {
  const { t } = useTranslation("common");
  const setListViewType = (listType: ListType) => {setType(listType); localStorage.setItem('jobListType', listType) };
  const departments: SelectListProps[] = companyInfo.departments.map(department => { return { id: department.id, value: department.attributes.name } });
  const workplaces: SelectListProps[] = companyInfo.workplaces.map(workplace => { return { id: workplace.id, value: workplace.attributes.name } });
  return (
    <div className="w-full space-y-4 p-4 mobile:pb-3 br-var box-shadow-container--card background-color--white">
      <SearchBar placeholder={t('search')} onChange={value => setSearch({ ...searchParams, searchText: value })} />
      <div className="flex desktop:flex-row desktop:space-x-4 mobile:space-y-4 mobile:flex-col">
        <Select list={workplaces} emptyValue={t('jobs.all-workplaces')} onChange={value => { setSearch({ ...searchParams, workplaces: +value ? [+value] : [] }); }} />
        <Select list={departments} emptyValue={t('jobs.all-locations')} onChange={value => setSearch({ ...searchParams, departments: +value ? [+value] : [] })} />
        <div className="flex items-center justify-center space-x-1">
          <ButtonTiny icon={faWindowMaximize} selected={type === ListType.cards} onClick={() => setListViewType(ListType.cards)} />
          <ButtonTiny icon={faList} selected={type === ListType.rows} onClick={() => setListViewType(ListType.rows)} />
        </div>
      </div>
    </div>
  )
}

