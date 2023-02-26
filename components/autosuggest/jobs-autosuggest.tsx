import { faMagnifyingGlass, faXmark } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { getJobs } from "../../services";
import Company from "../../services/models/company";
import Page from "../../services/models/page";
import Job from "../../services/models/job";
import { JobRowsList } from "../lists/job-rows-list";
import { useTranslation } from "next-i18next";
import { useDebounce } from "../../utils/debounce";

export const JobsAutosuggest = ({ company, onClick }: { company: Company, onClick?: (e: string) => void }) => {
  const { t } = useTranslation("common");
  const [value, setValue] = useState<string>('');
  const [debounceInput, setDebounceInput] = useDebounce(value, 400);
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      onClick(value);
    }
  }
  const [list, setList] = useState<Page<Job>>();
  const [loading, setLoading] = useState<boolean>(false);
  const search = async (searchText: string) => {
    setLoading(true);
    const result = await getJobs({ tenantCode: company.attributes.code, workplaces: [], departments: [], page: 1, perPage: 20, searchText })
    setList(result);
    setLoading(false);
  }
  const changeHandler = (value: string): void => {
    if (value) {
      search(value);
    } else {
      setList(null);
    }
  };

  const handleOnInputChange = useCallback((e: { target: { value: any; }; }) => {
    setValue(e.target.value)
    setDebounceInput(e.target.value);
  }, [debounceInput]);

  useEffect(() => {
    changeHandler(debounceInput)
  }, [debounceInput]);

  return (
    <div className="relative w-full px-6 pr-1 flex items-center box-shadow-container--card background-color--white br-var">
      <div className="flex absolute left-3 items-center justify-center w-2">
        <FontAwesomeIcon icon={faMagnifyingGlass} className={`icon-font icon-font--normal icon-font--field-button`} />
      </div>
      <input onKeyDown={handleKeyDown} value={value} onChange={handleOnInputChange} placeholder={t('job.banner.search', { company: company.attributes.name })} className="w-full background-color--white br-var font-multiline font--grey-1000 h-6 appearance-none" />
      {
        value &&
        <div className="flex cursor-pointer absolute right-3 items-center justify-center w-2" onClick={_ => {setValue(''); setDebounceInput(''); setList(null)}}>
          <FontAwesomeIcon icon={faXmark} className={`icon-font icon-font--normal icon-font--field-button`} />
        </div>
      }
      {
        (loading || list?.data.length > 0) &&
        <div className="flex absolute mobile:left-0 mobile:right-0 desktop:-left-32 desktop:-right-32 top-8">
          <JobRowsList loading={loading} jobList={list.data} company={company} classes="desktop:!max-h-90 mobile:!max-h-80 w-full !p-4 overflow-scroll background-color--white-transparent br-var" />
        </div>
      }
      {
        (!loading && list?.data.length <= 0 && value) && 
        <div className="flex absolute left-0 right-0 top-8">
          <div className="w-full !p-4 overflow-scroll background-color--white-transparent br-var">
            <p className="font-subtitle font-bold font--grey-1000">{t('job.not-exist')}</p>
          </div>
        </div>
      }
    </div>
  )
}
