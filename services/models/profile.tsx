export interface Profile {
  id: number;
  type: string;
  attributes: {
    headline: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }
}