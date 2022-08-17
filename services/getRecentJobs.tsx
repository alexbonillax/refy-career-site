import { post } from ".";
import Job from "./models/job";
import Page from "./models/page";

export const getRecentJobs = async (companyId: number): Promise<Page<Job>> => post('candidates/jobs/list', { companyId , departmentId: 0, page: 1, perPage: 20, searchText: ''})
