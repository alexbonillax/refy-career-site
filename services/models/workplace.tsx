export default interface Workplace {
  id?: number,
  attributes: {
    atsPartnerCode: string;
    address: string;
    name: string;
    route: string;
    areaId: number;
    areaName?: string;
    locality: string;
    postalCode: string;
    streetNumber: string;
    pictures: string[];
    shortDescription: string;
    description: string;
  },
  stats: {
    jobsCount: number
  },
  companyId?: number
}