import { post } from ".";
import { Job, Page } from "./models";

export const getRecentJobs = async (companyId: number): Promise<Page<Job>> => post('candidates/jobs/list', { companyId , departmentId: 0, page: 1, perPage: 20, searchText: ''})
