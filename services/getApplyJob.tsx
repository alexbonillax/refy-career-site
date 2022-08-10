import { post } from ".";
import { Job } from "./models";

export const getApplyJob = async (userCode: string): Promise<Job> => post('candidates/jobs/get', { userCode } );
