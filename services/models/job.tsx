import { Department } from "./department";
import { Profile } from "./profile";
import { Workplace } from "./workplace";

export interface Job {
  id: number;
  type: string;
  overview: {
    department: {
      id: number;
      name: string;
    };
    supervisorUser: Profile;
    workplaces: Workplace[];
  };
  attributes: {
    title: string;
    slug: string;
    picture: string;
    pictureUrl: string;
    screenshot: string;
    shortDescription: string;
    description: string;
    workplaceType: number;
    employmentType: number;
    reward: number;
    rewardCurrencyId: number;
    rewardConditions: string;
    rewardMultiplier: number;
    minSalary: number;
    maxSalary: number;
    salaryCurrencyId: number;
    salaryFrequency: number;
    visible: boolean;
    closed: boolean;
    hotRole: boolean;
    validHotRole: boolean;
    hotRoleStartsAt: Date;
    hotRoleEndsAt: Date;
    headcount: number;
    createdAt: Date;
    atsPartnerCode: string;
  };
  department: Department;
  workplaces: Workplace[];
  candidateQuestions: Question[];
  referrerQuestions: Question[];
  referrerUser: Profile;
  supervisorUser: Profile;
}