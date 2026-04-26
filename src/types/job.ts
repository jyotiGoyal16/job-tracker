export type ApplicationStatus = "applied" | "interview" | "rejected" | "offer";

export type Platform = "Linkedin" | "Indeed" | "Instahyre" | "Career Page";

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  platform: Platform;
  location: string;
  date: string;
  status: ApplicationStatus;
}
