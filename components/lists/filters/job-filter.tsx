import { faList, faWindowMaximize } from "@fortawesome/pro-light-svg-icons";
import { useTranslation } from "next-i18next";
import { JobSearchProps } from "../../../services";
import Company from "../../../services/models/company";
import { ButtonTiny } from "../../buttons/button-tiny";
import { SearchBar } from "../../input/search-bar";
import { Select, SelectListProps } from "../../select/select";
import { ListType } from "../enums/list-type";

export interface JobsFilterProps {
    searchParams: JobSearchProps;
    companyInfo: Company;
    type: ListType;
    setType: (e: ListType) => void;
    setSearch: (e: JobSearchProps) => void;
  }
  
  export const JobsFilter = ({ searchParams, companyInfo, type, setType, setSearch }: JobsFilterProps) => {
    const { t } = useTranslation("common");
    const setListViewType = (listType: ListType) => {setType(listType); localStorage.setItem('jobListType', listType) };
    const departments: SelectListProps[] = companyInfo.departments.map(department => { return { id: department.id, value: department.attributes.name } });
    const workplaces: SelectListProps[] = companyInfo.workplaces.map(workplace => { return { id: workplace.id, value: workplace.attributes.name } });
    return (
      <div className="w-full space-y-4 p-4 mobile:pb-3 br-var box-shadow-container--card background-color--white">
        <SearchBar placeholder={t('search')} value={searchParams.searchText} onChange={value => setSearch({ ...searchParams, searchText: value })} />
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