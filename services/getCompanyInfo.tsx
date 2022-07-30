import { getTenantCode } from "./getTenant";
import { Company } from "./models";
import { post } from "./post";

export const getCompanyInfo = async (): Promise<Company> => post('companies/get', { code: getTenantCode() } );