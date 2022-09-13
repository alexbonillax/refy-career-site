import { post } from ".";
import Job from "./models/job";

export const getJobDetails = async (id: any): Promise<Job> => post('candidates/jobs/get', { id });
export const getReferredJobDetails = async (userCode: string): Promise<Job> => post('candidates/jobs/get', { userCode });
