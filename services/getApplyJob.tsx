import { post } from ".";
import Job from "./models/job";

export const getApplyJob = async (userCode: string): Promise<Job> => post('candidates/jobs/get', { userCode } );
export {};
