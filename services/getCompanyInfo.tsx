import Company from "./models/company";
import { get } from "./";

// TODO Split endpoint by page
export const getCompanyInfo = async (code: string): Promise<Company> => get(`companies/${code}?include=departments,workplaces,values,benefits`);