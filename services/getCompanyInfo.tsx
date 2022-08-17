import { getTenantCode } from "./getTenant";
import Company from "./models/company";
import { post } from "./post";

export const getCompanyInfo = async (): Promise<Company> => post('companies/get', { code: getTenantCode() } );