import Department from "./department";
import Profile from "./profile";
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
    referrers: {visible: boolean};
    style: CareerStyles;
  };
  type: string;
  departments: Department[];
  workplaces: Workplace[];

}

export interface CareerStyles {
  header: { font: GoogleFont };
  body: { font: GoogleFont };
  button: ButtonStyles;
}

export interface ButtonStyles {
  filled: boolean;
  roundedCorners: number;
}

export interface GoogleFont {
  code: string;
  name: string;
}