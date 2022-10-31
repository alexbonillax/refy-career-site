import Benefit from "./benefit";
import Department from "./department";
import { Value } from "./values";
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
  benefits: Benefit[];
  careers: {
    style: CareerStyles;
    home: HomeProps;
    departments: SectionProps;
    workplaces: SectionProps;
    jobs: SectionProps;
    referrers: SectionProps;
    languageCode: string;
    published: boolean;
  };
  type: string;
  departments: Department[];
  workplaces: Workplace[];
  values: Value[];
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

interface HomeProps {
  title: string;
  picture: string;
}

interface SectionProps {
  visible: boolean;
  title: string;
  subtitle: string;
  ids: number[];
}