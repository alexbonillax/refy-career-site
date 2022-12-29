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
    signupEnabled: boolean;
  };
  benefits: Benefit[];
  careers: {
    analytics: Analytics;
    style: CareerStyles;
    home: HomeProps;
    departments: SectionProps;
    workplaces: SectionProps;
    jobs: SectionProps;
    stories: SectionProps;
    referrers: SectionProps;
    values: SectionProps;
    benefits: SectionProps;
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

export interface SectionProps {
  visible: boolean;
  navbar: string;
  title: string;
  subtitle: string;
  ids: number[];
}

interface Analytics {
  google: string;
}