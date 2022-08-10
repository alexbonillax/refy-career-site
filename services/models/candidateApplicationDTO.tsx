import { Phone } from "./phone";
import { Question } from "./question";

export interface CandidateApplicationDTO {
  jobId: number;
  jobCode: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone: Phone;
  coverLetter: string;
  resumeFile: File;
  languageCode?: string;
  questions: Question[];
}