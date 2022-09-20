import Company from "./models/company";
import { post } from "./post";

export const getCompanyInfo = async (code: string): Promise<Company> => post('companies/get', { code });