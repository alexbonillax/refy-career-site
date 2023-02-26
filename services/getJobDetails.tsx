import { get, post } from ".";
import Job from "./models/job";

export const getJobDetails = async (id: number, tenantCode: string): Promise<Job> =>
  get(`jobs/${id}?
    include=reward,salary,company,workplaces,salary,department,userJob,stats&
    scope=candidate&
    tenant=${tenantCode}`
  );
// get(`${id}?scope=candidate&tenant=${tenantCode}&include=reward,salary,supervisorUser,department,workplaces,userJob,stats,referrerQuestions,candidateQuestions`);

export const getReferredJobDetails = async (userCode: string, tenantCode: string): Promise<Job> =>
  get(`jobs/${userCode}?
    include=reward,salary,supervisorUser,referrerUser,company,workplaces,salary,department,userJob,stats&
    scope=candidate&
    tenant=${tenantCode}`
  );

