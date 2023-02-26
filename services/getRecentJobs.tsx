import { get, post } from ".";
import Job from "./models/job";
import Page from "./models/page";

export interface JobSearchProps {
  page: number;
  perPage: number;
  tenantCode: string;
  searchText: string;
  workplaces: number[];
  departments: number[]
}

// TODO Refactor
export const getRecentJobs = async (tenant: string): Promise<Page<Job>> =>
  get(`jobs?page=1&perPage=6&include=stats,department,workplaces&tenant=${tenant}&scope=candidate`)

export const getJobs = async (search: JobSearchProps): Promise<Page<Job>> =>
  get(`jobs?
  page=1&
  perPage=100&
  include=reward,supervisorUser,department,workplaces,userJob,stats&
  tenant=${search.tenantCode}&
  scope=candidate&
  ${search.searchText ? `filter[search]=${search?.searchText}&` : ''}
  ${search.workplaces.length > 0 ? `filter[workplaces]=${search?.workplaces}&` : ''}
  ${search.departments.length > 0 ? `filter[departments]=${search?.departments}` : ''}
  `)
