import { post } from ".";
import Job from "./models/job";

export const getJobDetails = async (id: number, companyId: number): Promise<Job> => post('candidates/jobs/get', { id, companyId });
export const getReferredJobDetails = async (userCode: string, companyId: number): Promise<Job> => post('candidates/jobs/get', { userCode, companyId });
