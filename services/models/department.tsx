import Profile from "./profile";

export default interface Department {
  id?: number;
  attributes: {
    atsPartnerCode: string;
    name: string;
    pictures: string[];
    shortDescription: string;
    description: string;
  };
  stats: {
    jobsCount: number
  },
  managerUser: Profile;
  companyId?: number;
  employees?: Profile[];
}
