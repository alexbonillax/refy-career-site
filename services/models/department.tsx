import Profile from "./profile";
export default interface Department {
  id?: number;
  attributes: {
    atsPartnerCode: string;
    name: string;
    picture?: string;
    availableJobs?: number;
  };
  managerUser: Profile;
  companyId?: number;
  employees?: Profile[];
}
