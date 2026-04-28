export type ApplicationStatus = "applied" | "interview" | "rejected" | "offer";

export type Platform =
  | "Linkedin"
  | "Indeed"
  | "Greenhouse"
  | "Workday"
  | "Other";

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  platform: Platform;
  location: string;
  date: string;
  status: ApplicationStatus;
}
