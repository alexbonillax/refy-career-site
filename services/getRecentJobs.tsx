import { post } from ".";
import Job from "./models/job";
import Page from "./models/page";

export interface JobSearchProps {
  page: number;
  perPage: number;
  searchText: string;
  workplaces: number[];
  departments: number[]
}

// TODO Refactor
export const getRecentJobs = async (companyId: number, departmentId = 0): Promise<Page<Job>> => post('candidates/jobs/list', { companyId, departmentId, page: 1, perPage: 20, searchText: '' })
export const getJobs = async (search: JobSearchProps): Promise<Page<Job>> => post('candidates/jobs/list', search)
