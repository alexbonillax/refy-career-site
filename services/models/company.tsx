import Department from "./department";
import Workplace from "./workplace";
export default interface Company {
  id: number;
  attributes: {
    name: string;
    code: string;
    tagline: string;
    description: string;
    logo: string;
    logoFileName: string;
    site: string;
    size: number;
    domains: [string];
    primaryColor: string;
    currencyId: number;
    privacyPolicy: string;
  };
  referralProgram: {
    accessPosts: boolean;
  };
  careers: {
    members: boolean;
  };
  type: string;
  departments: Department[];
  workplaces: Workplace[];
}