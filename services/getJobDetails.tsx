import { post } from ".";
import Job from "./models/job";

export const getJobDetails = async (id: number): Promise<Job> => post('candidates/jobs/get', { id })