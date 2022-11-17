import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import debounce from 'lodash.debounce';
import { getJobs } from "../../services";
import Company from "../../services/models/company";
import Page from "../../services/models/page";
import Job from "../../services/models/job";
import { JobRowsList } from "../lists/job-rows-list";
import { useTranslation } from "next-i18next";


export const JobsAutosuggest = ({ company, onClick }: { company: Company, onClick?: (e: string) => void }) => {
  const { t } = useTranslation("common");
  const [value, setValue] = useState<string>('');
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      onClick(value);
    }
  }
  const [list, setList] = useState<Page<Job>>();
  const [loading, setLoading] = useState<boolean>(false);
  const search = async (searchText: string) => {
    setLoading(true);
    const result = await getJobs({ companyId: company.id, workplaces: [], departments: [], page: 1, perPage: 20, searchText })
    setList(result);
    setLoading(false);
  }
  const changeHandler = (event: any): void => {
    setValue(event.target.value)
    if (event.target.value) {
      search(event.target.value);
    } else {
      setList(null);
    }
  };
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 400), []);

  return (
    <div className="relative w-full pl-6 pr-1 flex items-center box-shadow-container--card background-color--white br-var">
      <div className="flex absolute left-3 items-center justify-center w-2">
        <FontAwesomeIcon icon={faMagnifyingGlass} className={`icon-font icon-font--normal icon-font--field-button`} />
      </div>
      <input onKeyDown={handleKeyDown} onChange={debouncedChangeHandler} placeholder={t('job.banner.search', {company: company.attributes.name})} className="w-full background-color--white  font-multiline font--grey-1000 h-6 appearance-none" />
      {
        (loading || list?.content.length > 0) &&
        <div className="flex absolute h-57 left-0 right-0 top-6">
            <JobRowsList loading={loading} jobList={list} company={company} classes="!h-57 w-full !my-2 !py-0 overflow-scroll "/>
        </div>
      }
    </div>
  )
}
