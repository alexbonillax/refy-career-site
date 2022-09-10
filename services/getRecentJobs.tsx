import { post } from ".";
import Job from "./models/job";
import Page from "./models/page";

export const getRecentJobs = async (companyId: number, departmentId = 0): Promise<Page<Job>> => post('candidates/jobs/list', { companyId , departmentId, page: 1, perPage: 20, searchText: ''})
